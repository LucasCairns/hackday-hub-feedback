import * as AWS from 'aws-sdk';
import { Connection } from 'typeorm';
import { Feedback, AddFeedbackRequest } from '../../database/entities/feedback';

function unpackMessage(message: AWS.SQS.Message): AddFeedbackRequest {
  if (message.Body) {
    const parsed = JSON.parse(message.Body);
    const request: AddFeedbackRequest = JSON.parse(parsed.Message);
    return request;
  } else {
    throw new Error(`No message body`);
  }
}

export function createHandler(database: Connection) {
  const repository = database.getRepository(Feedback);
  return async function handleMessage(message: AWS.SQS.Message) {
    try {
      const request = unpackMessage(message);
      const feedback = await repository.save(Feedback.from(request));
      console.log(`🎉 Created! - ${feedback.id}`);
    } catch (e) {
      console.error(`💥 Unable to handle message - ${e.message}`);
    }
  };
}

export function createBatchHandler(database: Connection) {
  const handler = createHandler(database);
  return async function handleMessages(messages: AWS.SQS.Message[]) {
    console.log(`📬 ${messages.length} messages received!`);
    const requests = messages.map(handler);
    await Promise.all(requests);
  };
}
