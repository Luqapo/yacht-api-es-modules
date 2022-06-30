import Router from 'koa-router';
import { readFile } from 'fs/promises';
import { handleError } from '../utils/error.js';
import { validate } from '../utils/validate.js';
import { silentImport } from '../utils/import.js';

const service = await silentImport('/service/index.js');

const env = process.env.NODE_ENV || 'test';
const configJson = JSON.parse(
  await readFile(
    new URL('../config/config.json', import.meta.url),
  ),
);

const config = configJson[env];

const router = new Router({ prefix: '/user' });

const schema = {
  post: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 2, maxLength: 30 },
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 2, maxLength: 30 }, // TODO: add regex
    },
    required: ['name', 'email', 'password'],
    additionalProperties: false,
  },
  login: {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 2, maxLength: 30 }, // TODO: add regex
    },
    required: ['email', 'password'],
    additionalProperties: false,
  },
};

router.post('/login', (ctx, next) => validate(schema.login, ctx.request.body, next), async (ctx, next) => {
  try {
    const response = await service.user.login(ctx.request.body);
    ctx.body = response;
  } catch(err) {
    handleError(ctx, err);
  }
  next();
});

router.post('/logout', async (ctx, next) => {
  try {
    await service.user.logout(ctx.request.body, ctx.state.user);
    ctx.status = 204;
  } catch(err) {
    handleError(ctx, err);
  }
  next();
});

router.post('/', (ctx, next) => validate(schema.post, ctx.request.body, next), async (ctx, next) => {
  try {
    const status = await service.user.register(ctx.request.body);
    ctx.body = status;
    ctx.status = 201;
  } catch(err) {
    handleError(ctx, err);
  }
  next();
});

router.get('/confirm', async (ctx, next) => {
  try {
    await service.user.confirm(ctx.query.token, ctx.query.email);
    ctx.redirect(config.web_address);
  } catch(err) {
    handleError(ctx, err);
  }
  next();
});

router.post('/recover', async (ctx, next) => {
  try {
    await service.user.recover(ctx.request.body);
    ctx.status = 204;
  } catch(err) {
    handleError(ctx, err);
  }
  next();
});

export default router;
