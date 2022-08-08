import Router from 'koa-router';
import { JSONSchemaType } from 'ajv';
import { validate } from '../utils/validate.js';
import { dynamicImport } from '../utils/import.js';

const service = await dynamicImport('/dist/service/index.js');

const router = new Router({ prefix: '/reservation' });

interface Reservation {
  yacht_id: number
  user_id: number
  date_from: string
  date_to: string
  start_harbor_id: number
  end_harbor_id: number
}

const schemaReservation: JSONSchemaType<Reservation> = {
  type: 'object',
  properties: {
    yacht_id: { type: 'integer' },
    user_id: { type: 'integer' },
    date_from: {
      type: 'string',
      format: 'date',
    },
    date_to: {
      type: 'string',
      format: 'date',
    },
    start_harbor_id: { type: 'integer' },
    end_harbor_id: { type: 'integer' },
  },
  required: ['yacht_id', 'user_id', 'date_from', 'date_to', 'start_harbor_id', 'end_harbor_id'],
  additionalProperties: false,
};

router.get('/', async (ctx, next) => {
  try {
    const reservations = await service.reservation.get(ctx.query);
    ctx.body = reservations;
  } catch (err: any) {
    throw new Error(err.message);
  }
  next();
});

router.post('/', (ctx, next) => validate<Reservation>(schemaReservation, ctx.request.body, next), async (ctx, next) => {
  try {
    const reservation = await service.reservation.create(ctx.request.body);
    ctx.body = reservation;
  } catch (err: any) {
    throw new Error(err.message);
  }
  next();
});

router.get('/filters', async (ctx, next) => {
  try {
    const filters = await service.region.filters();
    ctx.body = filters;
  } catch (err: any) {
    throw new Error(err.message);
  }
  next();
});

export default router;
