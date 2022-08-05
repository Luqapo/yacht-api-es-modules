import * as logger from './logger.js';

export class ApiError extends Error {
  code: number;

  statusCode: number;

  constructor(message: string, code: number) {
    super();
    this.message = message;
    this.code = code;
    this.statusCode = code;
  }
}

export const handleError = (ctx: any, err: any) => {
  console.log('🚀 ~ file: error.ts ~ line 15 ~ handleError ~ err', err);
  logger.error(`app middleware:  ${err}`);
  ctx.status = err.statusCode || err.code || 500;
  ctx.body = { error: err.message };
};

export default ApiError;
