export class ApiError extends Error {
    code;
    statusCode;
    constructor(message, code) {
        super();
        this.message = message;
        this.code = code;
        this.statusCode = code;
    }
}
export const handleError = (ctx, err) => {
    ctx.status = err.statusCode || err.code || 500;
    ctx.body = { error: err.message };
};
export default ApiError;
