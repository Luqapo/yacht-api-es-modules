import { Context } from 'koa';
export declare class ApiError extends Error {
    code: number;
    statusCode: number;
    constructor(message: string, code: number);
}
export declare const handleError: (ctx: Context, err: ApiError) => void;
export default ApiError;
