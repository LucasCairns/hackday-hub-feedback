import { Router } from 'express';
import { Connection } from 'typeorm';
import { Feedback } from '../../database/entities/feedback';

export function createFeedbackApiController(database: Connection): Router {
  const router = Router();

  router.post('/add', async function addFeedback(req, res) {
    const feedback = database.getRepository('feedback');
    const n = Feedback.from({
      title: req.body.title,
      url: req.body.url,
      contentType: req.body.contentType,
      sentiment: req.body.sentiment,
      date: new Date(req.body.date),
      establishment: req.body.establishment,
      sessionId: req.body.sessionId,
      categories: req.body.categories || [],
      secondaryTags: req.body.secondaryTags || [],
    });
    await feedback.save(n);
    res.send('Created! 🎉');
  });

  return router;
}
