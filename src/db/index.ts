import 'reflect-metadata';
import { EntityManager, EntityRepository, MikroORM } from '@mikro-orm/core';
import { Yacht, User, Harbor, Reservation } from '../entities/index.js';

export const DI = {} as {
  orm: MikroORM,
  em: EntityManager,
  yachtRepository: EntityRepository<Yacht>,
  userRepository: EntityRepository<User>,
  harborRepository: EntityRepository<Harbor>,
  reservationRepository: EntityRepository<Reservation>,
};

export async function init() {
  DI.orm = await MikroORM.init(); // CLI config will be used automatically
  DI.em = DI.orm.em;
  DI.yachtRepository = DI.orm.em.getRepository(Yacht);
  DI.userRepository = DI.orm.em.getRepository(User);
  DI.harborRepository = DI.orm.em.getRepository(Harbor);
  DI.reservationRepository = DI.orm.em.getRepository(Reservation);
}
