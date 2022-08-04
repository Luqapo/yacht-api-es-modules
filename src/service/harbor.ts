import { ParsedUrlQuery } from 'querystring'
// import Harbor from '../model/harbor.js';

async function get(query: ParsedUrlQuery) {
  console.log('🚀 ~ file: harbor.ts ~ line 4 ~ get ~ query', query);
  // const harbors = await Harbor.get(query);

  return 'harbors.rows';
}

async function create(query: ParsedUrlQuery) {
  console.log('🚀 ~ file: harbor.ts ~ line 11 ~ create ~ query', query);
  // const harbors = await Harbor.create(query);

  return 'harbors.rows';
}

async function getOne(harborId: ParsedUrlQuery) {
  console.log('🚀 ~ file: harbor.ts ~ line 18 ~ getOne ~ harborId', harborId);
  // const harbors = await Harbor.getOne(harborId);

  return 'harbors.rows[0]';
}

async function filters() {
  // const result = await Harbor.getFilters();

  return 'result';
}

export default {
  create,
  get,
  getOne,
  filters,
};
