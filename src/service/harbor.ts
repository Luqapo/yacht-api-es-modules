import { ParsedUrlQuery } from 'querystring';
import { DI } from '../db/index.js';
import { Harbor } from '../entities/index.js';

async function get(query: ParsedUrlQuery) {
  console.log('🚀 ~ file: harbor.ts ~ line 4 ~ get ~ query', query);
  const harbors = DI.harborRepository.findAll(query);

  return harbors;
}

async function create(query: Harbor) {
  console.log('🚀 ~ file: harbor.ts ~ line 11 ~ create ~ query', query);
  const harbor = DI.harborRepository.create(query);
  await DI.harborRepository.persist(harbor).flush();

  return harbor;
}

async function getOne(harborId: ParsedUrlQuery) {
  console.log('🚀 ~ file: harbor.ts ~ line 18 ~ getOne ~ harborId', harborId);
  const harbor = DI.harborRepository.findOne({ id: harborId });

  return harbor;
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
