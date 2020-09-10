import { getDatabaseConnection } from './database/';
import { Connection } from 'typeorm';

export interface ApplicationConfiguration {
  database: Connection;
}

export async function createApp(): Promise<ApplicationConfiguration> {
  const database: Connection = await getDatabaseConnection();

  return {
    database,
  };
}
