import { Router, NextFunction, Request, Response } from 'express';
import { Connection } from 'typeorm';
import { Feedback } from '../../database/entities/feedback';
import { FeedbackApiService } from './service';

export function createFeedbackApiController(database: Connection): Router {
  const router = Router();
  const feedbackService = new FeedbackApiService(database);

  router.post('/add', async function addFeedback(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const feedback = await feedbackService.create(
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
      res.send(`🎉 Created! - ${feedback.id}`);
    } catch (e) {
      next(e);
    }
  });

  router.get('/all', async function getAllFeedback(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const all = await feedbackService.findAll();
      res.json(all);
    } catch (e) {
      next(e);
    }
  });

  router.get('/today', async function getAllFeedbackBetweenDates(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const today = new Date();
      const results = await feedbackService.findByDateRange(today, today);
      res.json(results);
    } catch (e) {
      next(e);
    }
  });

  router.get('/category/:id', async function getAllFeedback(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const all = await feedbackService.findByCategory(req.params.id);
      res.json(all);
    } catch (e) {
      next(e);
    }
  });

  router.get('/topic/:id', async function getAllFeedback(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const all = await feedbackService.findByTopic(req.params.id);
      res.json(all);
    } catch (e) {
      next(e);
    }
  });

  return router;
}
