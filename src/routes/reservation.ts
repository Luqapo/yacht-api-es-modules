import Router from 'koa-router';
import { JSONSchemaType } from 'ajv';
import { validate } from '../utils/validate.js';
import * as reservationService from '../service/reservation.js';
import { handleError } from '../utils/error.js';

const router = new Router({ prefix: '/reservation' });

export interface Reservation {
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
    const reservations = await reservationService.get(ctx.query, ctx.state.user);
    ctx.body = reservations;
  } catch (err: any) {
    throw new Error(err.message);
  }
  next();
});

router.post('/', (ctx, next) => validate<Reservation>(schemaReservation, ctx.request.body, next), async (ctx, next) => {
  try {
    const reservation = await reservationService.create(ctx.request.body, ctx.state.user);
    ctx.body = reservation;
  } catch (err: any) {
    handleError(ctx, err);
  }
  next();
});

router.get('/filters', async (ctx, next) => {
  try {
    const filters = await reservationService.filters();
    ctx.body = filters;
  } catch (err: any) {
    handleError(ctx, err);
  }
  next();
});

export default router;
