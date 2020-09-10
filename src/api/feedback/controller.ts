import { Router } from 'express';
import { Connection, Between } from 'typeorm';
import { Feedback } from '../../database/entities/feedback';
import { startOfDay, endOfDay } from 'date-fns';

export function createFeedbackApiController(database: Connection): Router {
  const router = Router();

  router.post('/add', async function addFeedback(req, res) {
    const feedback = database.getRepository(Feedback);
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

  router.get('/all', async function getAllFeedback(req, res) {
    const feedback = database.getRepository(Feedback);
    const all = await feedback.find();
    res.json(all);
  });

  router.get('/today', async function getAllFeedbackBetweenDates(req, res) {
    const feedback = database.getRepository(Feedback);
    const today = new Date();
    const results = await feedback.find({
      date: Between(
        startOfDay(today).toISOString(),
        endOfDay(today).toISOString()
      ),
    });
    res.json(results);
  });

  return router;
}
