import express, { Application } from 'express';
import * as bodyParser from 'body-parser';
import { createApp, ApplicationConfiguration } from './src/';
import { createFeedbackApiController } from './src/api/feedback/controller';

createApp()
  .then(({ database }: ApplicationConfiguration) => {
    const app: Application = express();
    const port = 8080;

    app.use(bodyParser.json());

    app.use('/api', createFeedbackApiController(database));

    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  })
  .catch((e: Error) =>
    console.log(`Failed to start application: ${e.message}`)
  );
