import { Context } from 'koa';

export class ApiError extends Error {
  code: number
  statusCode: number
  constructor(message: string, code: number) {
    super();
    this.message = message;
    this.code = code;
    this.statusCode = code;
  }
}

export const handleError = (ctx: Context, err: ApiError) => {
  ctx.status = err.statusCode || err.code || 500;
  ctx.body = { error: err.message };
};

export default ApiError;
