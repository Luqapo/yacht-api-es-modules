import * as db from '../db/index.js';
import BaseModel from './baseModel.js';

export class Region extends BaseModel {
  constructor() {
    super();
    this.schema = 'catalog';
    this.table = 'harbor';
    this.fields = ['id', 'name', 'long', 'lat', 'geom'];
  }

  create(data) {
    const sql = `INSERT INTO ${this.schema}.${this.table} (name,long,lat,geom)
      VALUES ($1,$2,$3,ST_GeomFromText('POINT(${data.long} ${data.lat})', 2180)) RETURNING id;
    `;
    return db.query(sql, data.name, data.long, data.lat);
  }
}

export default new Region();
