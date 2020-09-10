import { Entity, Column, PrimaryColumn } from 'typeorm';
import * as uuid from 'uuid';

export interface AddFeedbackRequest {
  id?: string;
  title: string;
  url: string;
  contentType: string;
  sentiment: string;
  date: Date;
  establishment: string;
  sessionId: string;
  categories?: string[];
  secondaryTags?: string[];
}

@Entity('feedback')
export class Feedback {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id!: string;

  @Column({ name: 'title' })
  title!: string;

  @Column({ name: 'url' })
  url!: string;

  @Column({ name: 'content_type' })
  contentType!: string;

  @Column({ name: 'sentiment' })
  sentiment!: string;

  @Column({ name: 'date', type: 'timestamp with time zone' })
  date!: Date;

  @Column({ name: 'establishment' })
  establishment!: string;

  @Column({ name: 'session_id', type: 'uuid' })
  sessionId!: string;

  @Column({ name: 'categories', type: 'jsonb' })
  categories!: string[];

  @Column({ name: 'secondary_tags', type: 'jsonb' })
  secondaryTags!: string[];

  constructor(
    id: string,
    title: string,
    url: string,
    contentType: string,
    sentiment: string,
    date: Date,
    establishment: string,
    sessionId: string,
    categories: string[],
    secondaryTags: string[]
  ) {
    this.id = id;
    this.title = title;
    this.url = url;
    this.contentType = contentType;
    this.sentiment = sentiment;
    this.date = date;
    this.establishment = establishment;
    this.sessionId = sessionId;
    this.categories = categories;
    this.secondaryTags = secondaryTags;
  }

  static from(request: AddFeedbackRequest): Feedback {
    return new Feedback(
      request.id || uuid.v4(),
      request.title,
      request.url,
      request.contentType,
      request.sentiment,
      request.date,
      request.establishment,
      request.sessionId,
      request.categories || [],
      request.secondaryTags || []
    );
  }
}
