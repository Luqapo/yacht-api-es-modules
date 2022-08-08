import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseEntity, User, Yacht } from './index.js';

@Entity({ schema: 'account' })
export class Reservation extends BaseEntity {
  @Property({ type: 'date' })
    date_from: string;

  @Property({ type: 'date' })
    date_to: string;

  @Property()
    start_harbor_id: number;

  @Property()
    end_harbor_id: number;

  @Property()
    user_id: number;

  @Property()
    yacht_id: number;

  constructor(
    date_from: string,
    date_to: string,
    start_harbor_id: number,
    end_harbor_id: number,
    user_id: number,
    yacht_id: number,
  ) {
    super();
    this.date_from = date_from;
    this.date_to = date_to;
    this.start_harbor_id = start_harbor_id;
    this.end_harbor_id = end_harbor_id;
    this.user_id = user_id;
    this.yacht_id = yacht_id;
  }
}
