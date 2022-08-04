import * as db from '../db/index.js';
import BaseModel from './baseModel.js';

export class User extends BaseModel {
  constructor() {
    super();
    this.schema = 'account';
    this.table = 'user';
    this.fields = ['id', 'email', 'password', 'name', 'type'];
    this.filters = [
      { name: 'email', field: 'email', filter: '=', type: 'string' },
    ];
  }

  create(data) {
    return db.query(`INSERT INTO ${this.schema}.${this.table} (name,email,password,type)
      VALUES ($1,$2,$3,$4) RETURNING id`, data.name, data.email, data.password, data.type);
  }

  updatePassword(password, id) {
    return db.query(`
      UPDATE ${this.schema}.${this.table} SET password =  '${password}' WHERE id = $1
    `, id);
  }
}

export default new User();
