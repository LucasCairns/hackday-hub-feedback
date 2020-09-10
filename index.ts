import express, { Request, Response, Application } from 'express';
import { createApp, ApplicationConfiguration } from './src/';

createApp()
  .then(({ database }: ApplicationConfiguration) => {
    const app: Application = express();
    const port = 8080;

    app.get('/', (req: Request, res: Response) => res.send('Hello World!'));

    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  })
  .catch((e: Error) =>
    console.log(`Failed to start application: ${e.message}`)
  );
