import { Entity, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity.js';

@Entity({ schema: 'account' })
export class User extends BaseEntity {
  @Property({ type: 'varchar', length: 50 })
  @Unique()
    email: string;

  @Property({ type: 'varchar', length: 100 })
    password: string;

  @Property({ type: 'varchar', length: 20 })
    name: string;

  @Property({ type: 'smallint' })
    role_id = 1;

  @Property({ nullable: true })
    firebase_token = null;

  constructor(email: string, password: string, name: string) {
    super();
    this.email = email;
    this.password = password;
    this.name = name;
  }
}
