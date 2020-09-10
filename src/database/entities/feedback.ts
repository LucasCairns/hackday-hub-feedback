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
  categories: string[];
  secondaryTags: string[];
}

@Entity()
export class Feedback {
  @PrimaryColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  url!: string;

  @Column()
  contentType!: string;

  @Column()
  sentiment!: string;

  @Column('timestamp with time zone')
  date!: Date;

  @Column()
  establishment!: string;

  @Column('uuid')
  sessionId!: string;

  @Column('jsonb')
  categories!: string[];

  @Column('jsonb')
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
      request.categories,
      request.secondaryTags
    );
  }
}
