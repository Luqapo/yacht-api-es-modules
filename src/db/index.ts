import 'reflect-metadata';
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';
import { Yacht } from '../entities/Yacht.js';

export const DI = {} as {
  orm: MikroORM,
  em: EntityManager,
  yachtRepository: EntityRepository<Yacht>,
};

export async function init() {
  DI.orm = await MikroORM.init(); // CLI config will be used automatically
  DI.em = DI.orm.em;
  DI.yachtRepository = DI.orm.em.getRepository(Yacht);
}