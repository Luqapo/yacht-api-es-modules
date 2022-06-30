import BaseModel from './baseModel.js';

export class Reservation extends BaseModel {
  constructor() {
    super();
    this.schema = 'account';
    this.table = 'reservation';
    this.fields = ['id', 'yacht_id', 'user_id', 'date_from', 'date_to', 'start_harbor_id', 'end_harbor_id', 'created_at'];
  }
}

export default new Reservation();
