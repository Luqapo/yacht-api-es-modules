import { JSONSchemaType } from 'ajv';
export declare function validate<T>(schema: JSONSchemaType<T>, data: T, next: () => Promise<any>): Promise<void>;
declare const _default: {
    validate: typeof validate;
};
export default _default;
