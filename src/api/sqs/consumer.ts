import { Consumer } from 'sqs-consumer';
import * as AWS from 'aws-sdk';

type MessageHandler = (message: AWS.SQS.Message) => Promise<void>;
type BatchMessageHandler = (messages: AWS.SQS.Message[]) => Promise<void>;

interface ConsumerOptions {
  handleMessage?: MessageHandler;
  handleMessageBatch?: BatchMessageHandler;
}

export function createConsumer(options: ConsumerOptions) {
  AWS.config.update({
    region: 'eu-west-2',
    accessKeyId: 'test',
    secretAccessKey: 'test',
  });

  const consumer = new Consumer({
    ...options,
    queueUrl: 'http://localhost:4576/queue/feedback_queue',
    sqs: new AWS.SQS(),
    batchSize: 10,
    pollingWaitTimeMs: 10,
  });

  consumer.on('error', (err) => console.log(`💥 ${err.message}`));
  consumer.on('processing_error', (err) => console.log(`💥 ${err.message}`));
  consumer.on('empty', () => console.log('📭 No messages'));

  return consumer;
}
