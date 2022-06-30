import Harbor from '../model/harbor.js';

async function get(query) {
  const harbors = await Harbor.get(query);

  return harbors.rows;
}

async function create(query) {
  const harbors = await Harbor.create(query);

  return harbors.rows;
}

async function getOne(harborId) {
  const harbors = await Harbor.getOne(harborId);

  return harbors.rows[0];
}

async function filters() {
  const result = await Harbor.getFilters();

  return result;
}

export default {
  create,
  get,
  getOne,
  filters,
};
