export class ApiError extends Error {
  constructor(message, code) {
    super();
    this.message = typeof message === 'object' ? JSON.stringify(message) : message;
    this.code = code;
    this.statusCode = code;
  }
}

export const handleError = (ctx, err) => {
  ctx.status = err.statusCode || err.code || 500;
  ctx.body = { error: err.message };
};

export default ApiError;
