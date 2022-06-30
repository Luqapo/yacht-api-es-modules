import Router from 'koa-router';
import { silentImport } from '../utils/import.js';

const service = await silentImport('/service/index.js');

const router = new Router({ prefix: '/harbor' });

router.get('/', async (ctx, next) => {
  try {
    const harbors = await service.harbor.get(ctx.query);
    ctx.body = harbors;
  } catch(err) {
    throw new Error(err.message);
  }
  next();
});

router.post('/', async (ctx, next) => {
  try {
    const harbor = await service.harbor.create(ctx.request.body);
    ctx.body = harbor;
  } catch(err) {
    throw new Error(err.message);
  }
  next();
});

router.get('/filters', async (ctx, next) => {
  try {
    const filters = await service.harbor.filters();
    ctx.body = filters;
  } catch(err) {
    throw new Error(err.message);
  }
  next();
});

router.get('/one/:harborId', async (ctx, next) => {
  try {
    const { harborId } = ctx.params;
    const harbor = await service.harbor.getOne(harborId);
    ctx.body = harbor;
  } catch(err) {
    throw new Error(err.message);
  }
  next();
});

export default router;
