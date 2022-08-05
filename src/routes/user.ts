import Router from 'koa-router';
import { JSONSchemaType } from 'ajv';
import { handleError } from '../utils/error.js';
import { validate } from '../utils/validate.js';
import { dynamicImport } from '../utils/import.js';

import config from '../config/config.json' assert { type: 'json' };

const service = await dynamicImport('/dist/service/index.js');

const router = new Router({ prefix: '/user' });

interface UserLogin {
  email: string
  password: string
}

interface User extends UserLogin {
  name: string
}

const schemaUserCreate: JSONSchemaType<User> = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 2, maxLength: 30 },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 2, maxLength: 30 }, // TODO: add regex
  },
  required: ['name', 'email', 'password'],
  additionalProperties: false,
};

const schemaUserLogin: JSONSchemaType<UserLogin> = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 2, maxLength: 30 }, // TODO: add regex
  },
  required: ['email', 'password'],
  additionalProperties: false,
};

router.post('/login', (ctx, next) => validate<UserLogin>(schemaUserLogin, ctx.request.body, next), async (ctx, next) => {
  try {
    const response = await service.user.login(ctx.request.body);
    ctx.body = response;
  } catch(err: any) {
    handleError(ctx, err);
  }
  next();
});

router.post('/logout', async (ctx, next) => {
  try {
    await service.user.logout(ctx.request.body, ctx.state.user);
    ctx.status = 204;
  } catch(err: any) {
    handleError(ctx, err);
  }
  next();
});

router.post('/', (ctx, next) => validate<User>(schemaUserCreate, ctx.request.body, next), async (ctx, next) => {
  try {
    const status = await service.user.register(ctx.request.body);
    ctx.body = status;
    ctx.status = 201;
  } catch(err: any) {
    handleError(ctx, err);
  }
  next();
});

router.get('/confirm', async (ctx, next) => {
  try {
    await service.user.confirm(ctx.query.token, ctx.query.email);
    ctx.redirect(config.web_address);
  } catch(err: any) {
    handleError(ctx, err);
  }
  next();
});

router.post('/recover', async (ctx, next) => {
  try {
    await service.user.recover(ctx.request.body);
    ctx.status = 204;
  } catch(err: any) {
    handleError(ctx, err);
  }
  next();
});

export default router;
