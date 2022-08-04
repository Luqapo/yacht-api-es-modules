import * as db from '../db/index.ts.old';

function getLimit(limit) {
  if(limit) {
    return `LIMIT ${limit}`;
  }
  return '';
}

function getOffset(offset) {
  if(offset) {
    return `OFFSET ${offset}`;
  }
  return '';
}

function getOrderBy(order) {
  if(order) {
    return `ORDER BY ${order.replaceAll(';', ' ')}`;
  }
  return '';
}

class BaseModel {
  constructor() {
    this.filters = [];
  }

  buildWhere(where) {
    if(!where) return '';
    const filters = [];
    Object.keys(where).forEach((v) => {
      if([...this.fields, ...this.filters.map((f) => f.name)].indexOf(v) > -1) {
        const isFilter = this.filters.find((f) => f.name === v);
        if(isFilter && isFilter.type === 'string' && isFilter.filter === 'ILIKE') {
          filters.push(`${isFilter.field} ${isFilter.filter} '%${where[v]}%'`);
        } else if(isFilter && isFilter.filter === '@>') {
          filters.push(`${isFilter.field} ${isFilter.filter} array[${where[v]}]`);
        } else if(isFilter) {
          filters.push(`${isFilter.field} ${isFilter.filter} '${where[v]}'`);
        } else {
          filters.push(`${v} = ${where[v]}`);
        }
      } else {
        throw new Error('Invalid filter!');
      }
    });

    return filters.join(' AND ');
  }

  getWhere(where) {
    if(where) {
      const whereObject = where.split(',').reduce((acc, e) => {
        const [key, value] = e.split(';');
        acc[key] = value;
        return acc;
      }, {});
      return `WHERE ${this.buildWhere(whereObject)}`;
    }
    return '';
  }

  validateFields(fields) {
    fields.split(',').forEach((f) => {
      if(this.fields.indexOf(f) < 0) {
        throw new Error('Invalid filed');
      }
    });
  }

  getFields(fields) {
    if(this.view_fields) {
      return this.view_fields.join(',');
    }
    if(fields) {
      this.validateFields(fields);
      return fields;
    }
    return this.fields.join(',');
  }

  getFilters() {
    if(this.filters) {
      return this.filters.map((f) => ({ name: f.name, type: f.type }));
    }
    return [];
  }

  get({ where, fields, limit, offset, order }) {
    return db.query(`SELECT ${this.getFields(fields)}
      FROM ${this.schema}.${this.view || this.table}
      ${this.getWhere(where)} ${getOrderBy(order)} ${getLimit(limit)} ${getOffset(offset)}`);
  }

  find({ where, fields }) {
    return db.query(`SELECT ${this.getFields(fields)} FROM ${this.schema}.${this.table} WHERE ${this.buildWhere(where)}`);
  }

  getOne(id) {
    return db.query(`SELECT ${this.getFields().join(',')}
    FROM ${this.schema}.${this.view || this.table} WHERE ${this.buildWhere({ id })}`);
  }

  getInsertData(data) {
    const columns = [];
    const values = [];
    const args = [];
    Object.keys(data).forEach((k, i) => {
      if(this.fields.indexOf(k) < 0) {
        throw new Error('Invalid data to insert');
      }
      columns.push(k);
      values.push(`$${i+1}`);
      args.push(data[k]);
    });

    return { columns, values, args };
  }

  insert(data) {
    if(!data) {
      throw new Error('Missing data to insert');
    }
    if(!Object.keys(data)) {
      throw new Error('Empty data to insert');
    }
    const { columns, values, args } = this.getInsertData(data);
    const sql = `INSERT INTO ${this.schema}.${this.table} (${columns.join(',')})
      VALUES(${values.join(',')}) RETURNING id`;

    return db.query(sql, ...args);
  }

  async create(data) {
    const newRow = await this.insert(data);

    return newRow.rows[0];
  }
}

export default BaseModel;
