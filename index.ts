import express, { Application, Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import { createApp, ApplicationConfiguration } from './src/';
import { createFeedbackApiController } from './src/api/feedback/controller';

createApp()
  .then(({ database, consumer }: ApplicationConfiguration) => {
    const app: Application = express();
    const port = 8080;

    app.use(bodyParser.json());

    app.use('/api', createFeedbackApiController(database));

    app.use((req: Request, res: Response, next: NextFunction) => {
      res.send(`🤷‍♂️ Not Found - ${req.path}`);
    });

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      res.send(`💥 Something went wrong - ${err.message}`);
    });

    consumer.start();

    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  })
  .catch((e: Error) =>
    console.error(`Failed to start application: ${e.message}`)
  );
