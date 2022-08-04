import 'reflect-metadata';
import { EntityManager, EntityRepository, MikroORM } from '@mikro-orm/core';
import { Yacht } from '../entities/Yacht.js';
export declare const DI: {
    orm: MikroORM;
    em: EntityManager;
    yachtRepository: EntityRepository<Yacht>;
};
export declare function init(): Promise<void>;
