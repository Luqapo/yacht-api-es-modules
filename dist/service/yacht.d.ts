/// <reference types="node" />
import { ParsedUrlQuery } from 'querystring';
import { Yacht } from '../entities/index.js';
declare function create(query: Yacht): Promise<Yacht>;
declare function get(query: ParsedUrlQuery): Promise<import("@mikro-orm/core").Loaded<Yacht, never>[]>;
declare function filters(): Promise<string>;
declare const _default: {
    create: typeof create;
    get: typeof get;
    filters: typeof filters;
};
export default _default;
