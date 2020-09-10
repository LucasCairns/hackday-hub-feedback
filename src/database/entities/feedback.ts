import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryColumn('uuid')
  id!: number;

  @Column()
  title!: string;

  @Column()
  URL!: string;

  @Column()
  contentType!: string;

  @Column()
  sentiment!: string;

  @Column('time with time zone')
  date!: string;

  @Column()
  establishment!: string;

  @Column('uuid')
  sessionID!: string;

  @Column('jsonb')
  categories!: [string];

  @Column('jsonb')
  secondaryTags!: [string];
}
