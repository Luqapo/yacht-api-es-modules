import { BaseEntity } from './BaseEntity.js';
export declare class Yacht extends BaseEntity {
    model: string;
    crew: number;
    production_date: string;
    constructor(model: string, crew: number, production_date: string);
}
