import { ParsedUrlQuery } from 'querystring'
import { DI } from '../db/index.js';
import { Yacht } from '../entities/index.js';

async function create(query: Yacht) {
  console.log('🚀 ~ file: yacht.ts ~ line 5 ~ create ~ query', query);
  const yacht = DI.yachtRepository.create(query);
  await DI.yachtRepository.persist(yacht).flush();

  return yacht;
}

async function get(query: ParsedUrlQuery) {
  const yachts = DI.yachtRepository.findAll(query);

  return yachts;
}

async function filters() {
  // const result = await Yacht.getFilters();

  return 'result';
}

export default {
  create,
  get,
  filters,
};
