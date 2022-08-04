import Router from 'koa-router';
import { dynamicImport } from '../utils/import.js';

const service = await dynamicImport('/dist/service/index.js');

const router = new Router({ prefix: '/harbor' });

router.get('/', async (ctx, next) => {
  console.log('🚀 ~ file: harbor.ts ~ line 10 ~ router.get ~ ctx', ctx);
  try {
    const harbors = await service.harbor.get(ctx.query);
    ctx.body = harbors;
  } catch(err: any) {
    throw new Error(err.message);
  }
  next();
});

router.post('/', async (ctx, next) => {
  console.log('🚀 ~ file: harbor.ts ~ line 21 ~ router.post ~ ctx', ctx);
  try {
    const harbor = await service.harbor.create(ctx.request.body);
    ctx.body = harbor;
  } catch(err: any) {
    throw new Error(err.message);
  }
  next();
});

router.get('/filters', async (ctx, next) => {
  console.log('🚀 ~ file: harbor.ts ~ line 32 ~ router.get ~ ctx', ctx);
  try {
    const filters = await service.harbor.filters();
    ctx.body = filters;
  } catch(err: any) {
    throw new Error(err.message);
  }
  next();
});

router.get('/one/:harborId', async (ctx, next) => {
  console.log('🚀 ~ file: harbor.ts ~ line 43 ~ router.get ~ ctx', ctx);
  try {
    const { harborId } = ctx.params;
    const harbor = await service.harbor.getOne(harborId);
    ctx.body = harbor;
  } catch(err: any) {
    throw new Error(err.message);
  }
  next();
});

export default router;
