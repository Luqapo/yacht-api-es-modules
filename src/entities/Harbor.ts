import { Entity, Property, Unique } from '@mikro-orm/core';
import { Point } from './Point.js';
import { PointType } from './PointType.js';
import { BaseEntity } from './BaseEntity.js';

@Entity({ schema: 'catalog' })
export class Harbor extends BaseEntity {
  @Property({ type: 'varchar', length: 30 })
  @Unique()
    name: string;

  @Property({ type: PointType })
    geom: Point;

  constructor(name: string, long: string, lat: string) {
    super();
    this.name = name;
    this.geom = new Point(lat, long);
  }
}
