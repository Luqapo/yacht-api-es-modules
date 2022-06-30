import Yacht from '../model/yacht.js';

async function create(query) {
  const yacht = await Yacht.create(query);

  return yacht.rows;
}

async function get(query) {
  const yachts = await Yacht.get(query);

  return yachts.rows;
}

async function filters() {
  const result = await Yacht.getFilters();

  return result;
}

export default {
  create,
  get,
  filters,
};
