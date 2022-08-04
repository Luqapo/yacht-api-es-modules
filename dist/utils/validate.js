import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { ApiError } from './error.js';
const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });
addFormats(ajv);
export async function validate(schema, data, next) {
    var _a;
    const validator = ajv.compile(schema);
    const valid = validator(data);
    if (!valid) {
        throw new ApiError(JSON.stringify((_a = validator.errors) === null || _a === void 0 ? void 0 : _a.map((error) => ({ message: error.message, reason: error.params }))), 400);
    }
    await next();
}
export default {
    validate,
};
