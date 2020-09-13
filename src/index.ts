import { getDatabaseConnection } from './database/';
import { Connection } from 'typeorm';
import { createConsumer } from './api/sqs/consumer';
import { Consumer } from 'sqs-consumer';
import { createHandler, createBatchHandler } from './api/sqs/handler';

export interface ApplicationConfiguration {
  database: Connection;
  consumer: Consumer;
}

export async function createApp(): Promise<ApplicationConfiguration> {
  const database: Connection = await getDatabaseConnection();

  const consumer = createConsumer({
    handleMessageBatch: createBatchHandler(database),
  });

  return {
    database,
    consumer,
  };
}
