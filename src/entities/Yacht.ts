import { Entity, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity.js';

@Entity({ schema: 'catalog' })
export class Yacht extends BaseEntity {
  @Property({ type: 'varchar', length: 50 })
  @Unique()
    model: string;

  @Property()
    crew: number;

  @Property()
    production_date: string;

  constructor(model: string, crew: number, production_date: string) {
    super();
    this.model = model;
    this.crew = crew;
    this.production_date = production_date;
  }
}
