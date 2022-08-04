var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity.js';
let Yacht = class Yacht extends BaseEntity {
    model;
    crew;
    production_date;
    constructor(model, crew, production_date) {
        super();
        this.model = model;
        this.crew = crew;
        this.production_date = production_date;
    }
};
__decorate([
    Property({ type: 'varchar', length: 50 }),
    Unique(),
    __metadata("design:type", String)
], Yacht.prototype, "model", void 0);
__decorate([
    Property(),
    __metadata("design:type", Number)
], Yacht.prototype, "crew", void 0);
__decorate([
    Property(),
    __metadata("design:type", String)
], Yacht.prototype, "production_date", void 0);
Yacht = __decorate([
    Entity({ schema: 'catalog' }),
    __metadata("design:paramtypes", [String, Number, String])
], Yacht);
export { Yacht };
