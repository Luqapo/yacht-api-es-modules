import { ParsedUrlQuery } from 'querystring';
// import { Reservation } from '../model/reservation.js';

async function create(query: ParsedUrlQuery) {
  console.log('🚀 ~ file: reservation.ts ~ line 4 ~ create ~ query', query);
  // const reservation = await Reservation.create(query);

  return 'reservation.rows';
}

async function get(query: ParsedUrlQuery) {
  console.log('🚀 ~ file: reservation.ts ~ line 11 ~ get ~ query', query);
  // const reservations = await Reservation.get(query);

  return 'reservations.rows';
}

async function filters() {
  // const result = await Reservation.getFilters();

  return 'result';
}

export default {
  create,
  get,
  filters,
};
