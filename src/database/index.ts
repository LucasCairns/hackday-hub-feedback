import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import { Feedback } from './entities/feedback';

export async function getDatabaseConnection(): Promise<Connection> {
  const connection: Connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: 'test',
    database: 'test',
    entities: [Feedback],
    synchronize: true,
    logging: false,
  });

  return connection;
}
