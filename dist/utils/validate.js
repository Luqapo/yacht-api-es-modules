import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { ApiError } from './error.js';
const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });
addFormats(ajv);
export async function validate(schema, data, next) {
    const validator = ajv.compile(schema);
    const valid = validator(data);
    if (!valid) {
        throw new ApiError(JSON.stringify(validator.errors?.map((error) => ({ message: error.message, reason: error.params }))), 400);
    }
    await next();
}
export default {
    validate,
};
