import Router from 'koa-router';
import { JSONSchemaType } from 'ajv';
import { validate } from '../utils/validate.js';
import { dynamicImport } from '../utils/import.js';

const service = await dynamicImport('/dist/service/index.js');

const router = new Router({ prefix: '/yacht' });

interface Yacht {
  model: string
  crew: number
  production_date: string
}

const schemaYacht: JSONSchemaType<Yacht> = {
  type: 'object',
  properties: {
    model: { type: 'string', minLength: 2, maxLength: 30 },
    crew: { type: 'integer' },
    production_date: {
      type: 'string',
      format: 'date',
    },
  },
  required: ['model', 'crew', 'production_date'],
  additionalProperties: false,
};

router.get('/', async (ctx, next) => {
  try {
    const yachts = await service.yacht.get(ctx.query);
    ctx.body = yachts;
  } catch(err: any) {
    throw new Error(err.message);
  }
  next();
});

router.post('/', (ctx, next) => validate<Yacht>(schemaYacht, ctx.request.body, next), async (ctx, next) => {
  try {
    const yacht = await service.yacht.create(ctx.request.body);
    ctx.body = yacht;
    ctx.status = 201;
  } catch(err: any) {
    throw new Error(err.message);
  }
  next();
});

router.get('/filters', async (ctx, next) => {
  try {
    const filters = await service.region.filters();
    ctx.body = filters;
  } catch(err: any) {
    throw new Error(err.message);
  }
  next();
});

export default router;
