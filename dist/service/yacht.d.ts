/// <reference types="node" />
import { ParsedUrlQuery } from 'querystring';
declare function create(query: ParsedUrlQuery): Promise<string>;
declare function get(query: ParsedUrlQuery): Promise<string>;
declare function filters(): Promise<string>;
declare const _default: {
    create: typeof create;
    get: typeof get;
    filters: typeof filters;
};
export default _default;
