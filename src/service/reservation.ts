import { ParsedUrlQuery } from 'querystring';
import { DI } from '../db/index.js';
import { Reservation } from '../entities/index.js';

async function create(query: Reservation) {
  console.log('🚀 ~ file: reservation.ts ~ line 4 ~ create ~ query', query);
  const reservation = DI.reservationRepository.create(query);
  await DI.reservationRepository.persist(reservation).flush();

  return reservation;
}

async function get(query: ParsedUrlQuery) {
  console.log('🚀 ~ file: reservation.ts ~ line 11 ~ get ~ query', query);
  const reservations = await DI.reservationRepository.findAll(query);

  return reservations;
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
