import Router from 'koa-router';
import * as harborService from '../service/harbor.js';

const router = new Router({ prefix: '/harbor' });

router.get('/', async (ctx, next) => {
  try {
    const harbors = await harborService.get(ctx.query);
    ctx.body = harbors;
  } catch (err: any) {
    throw new Error(err.message);
  }
  next();
});

router.post('/', async (ctx, next) => {
  try {
    const harbor = await harborService.create(ctx.request.body);
    ctx.body = harbor;
  } catch (err: any) {
    throw new Error(err.message);
  }
  next();
});

router.get('/filters', async (ctx, next) => {
  try {
    const filters = await harborService.filters();
    ctx.body = filters;
  } catch (err: any) {
    throw new Error(err.message);
  }
  next();
});

router.get('/:harborId', async (ctx, next) => {
  try {
    const { harborId } = ctx.params;
    const harbor = await harborService.getOne(+harborId);
    ctx.body = harbor;
  } catch (err: any) {
    throw new Error(err.message);
  }
  next();
});

export default router;
