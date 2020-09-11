import { Router } from 'express';
import { Connection } from 'typeorm';
import { Feedback } from '../../database/entities/feedback';
import { FeedbackApiService } from './service';

export function createFeedbackApiController(database: Connection): Router {
  const router = Router();
  const feedbackService = new FeedbackApiService(database);

  router.post('/add', async function addFeedback(req, res) {
    await feedbackService.create(
      Feedback.from({
        title: req.body.title,
        url: req.body.url,
        contentType: req.body.contentType,
        sentiment: req.body.sentiment,
        date: new Date(req.body.date),
        establishment: req.body.establishment,
        sessionId: req.body.sessionId,
        categories: req.body.categories || [],
        secondaryTags: req.body.secondaryTags || [],
      })
    );
    res.send('Created! 🎉');
  });

  router.get('/all', async function getAllFeedback(req, res) {
    const all = await feedbackService.findAll();
    res.json(all);
  });

  router.get('/today', async function getAllFeedbackBetweenDates(req, res) {
    const today = new Date();
    const results = await feedbackService.findByDateRange(today, today);
    res.json(results);
  });

  router.get('/category/:id', async function getAllFeedback(req, res) {
    const all = await feedbackService.findByCategory(req.params.id);
    res.json(all);
  });

  router.get('/topic/:id', async function getAllFeedback(req, res) {
    const all = await feedbackService.findByTopic(req.params.id);
    res.json(all);
  });

  return router;
}
