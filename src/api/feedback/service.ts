import { Connection, Between, Repository } from 'typeorm';
import { Feedback } from '../../database/entities/feedback';
import { startOfDay, endOfDay } from 'date-fns';

export class FeedbackApiService {
  repository: Repository<Feedback>;

  constructor(database: Connection) {
    this.repository = database.getRepository(Feedback);
  }

  create(feedback: Feedback): Promise<Feedback> {
    return this.repository.save(feedback);
  }

  findAll(): Promise<Feedback[]> {
    return this.repository.find();
  }

  findByDateRange(start: Date, end: Date): Promise<Feedback[]> {
    return this.repository.find({
      date: Between(
        startOfDay(start).toISOString(),
        endOfDay(end).toISOString()
      ),
    });
  }

  findByCategory(category: string): Promise<Feedback[]> {
    return this.repository
      .createQueryBuilder('feedback')
      .where(`feedback.categories::jsonb ? '${category}'`)
      .getMany();
  }

  findByTopic(topic: string): Promise<Feedback[]> {
    return this.repository
      .createQueryBuilder('feedback')
      .where(`feedback.secondary_tags::jsonb ? '${topic}'`)
      .getMany();
  }
}
