import BaseModel from './baseModel.js';

export class Region extends BaseModel {
  constructor() {
    super();
    this.schema = 'catalog';
    this.table = 'yacht';
    this.fields = ['id', 'model', 'crew', 'production_date', 'created_at'];
  }
}

export default new Region();
