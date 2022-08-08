import { ParsedUrlQuery } from 'querystring';
import { DI } from '../db/index.js';
import { User } from '../entities/index.js';
import { Reservation } from '../routes/reservation.js';
import { ApiError } from '../utils/error.js';

async function validateYacht(yacht_id: number) {
  const yacht = await DI.yachtRepository.findOne({ id: yacht_id });

  if (!yacht) {
    throw new ApiError('Invalid yacht id!', 400);
  }
}

async function validateHarbor(harbor_id: number) {
  const harbor = await DI.harborRepository.findOne({ id: harbor_id });

  if (!harbor) {
    throw new ApiError('Invalid habror id!', 400);
  }
}

export async function create(data: Reservation, user: User) {
  await validateYacht(data.yacht_id);
  await validateHarbor(data.start_harbor_id);
  await validateHarbor(data.end_harbor_id);
  const reservation = DI.reservationRepository.create({
    date_from: data.date_from,
    date_to: data.date_to,
    start_harbor: data.start_harbor_id,
    end_harbor: data.end_harbor_id,
    user: user.id,
    yacht: data.yacht_id,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await DI.reservationRepository.persist(reservation).flush();

  return reservation;
}

export async function get(query: ParsedUrlQuery, user: User) {
  const reservations = await DI.reservationRepository.find({ user: user.id });

  return reservations;
}

export async function filters() {
  // const result = await Reservation.getFilters();

  return 'result';
}

// export default {
//   create,
//   get,
//   filters,
// };
