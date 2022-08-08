import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseEntity, User, Yacht, Harbor } from './index.js';

@Entity({ schema: 'account' })
export class Reservation extends BaseEntity {
  @Property({ type: 'date' })
    date_from: string;

  @Property({ type: 'date' })
    date_to: string;

  @ManyToOne()
    start_harbor?: Harbor;

  @ManyToOne()
    end_harbor?: Harbor;

  @ManyToOne()
    user?: User;

  @ManyToOne()
    yacht?: Yacht;

  constructor(
    date_from: string,
    date_to: string,
  ) {
    super();
    this.date_from = date_from;
    this.date_to = date_to;
  }
}
