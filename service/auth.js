import crypto from 'crypto';
import { readFile } from 'fs/promises';
import * as logger from '../utils/logger.js';
import * as redis from './redis.js';
import UserRoleEnum from '../utils/enums.js';

const env = process.env.NODE_ENV || 'test';
const configJson = JSON.parse(
  await readFile(
    new URL('../config/config.json', import.meta.url),
  ),
);

const config = configJson[env];

function hash(string, algorithm = 'sha256') {
  return crypto.createHmac(algorithm, config.secret).update(string).digest('hex');
}

function verify(string, salt, algorithm = 'sha256') {
  return crypto.createHmac(algorithm, config.secret).update(string).digest('hex') === salt;
}

function randomString(length = 12) {
  return crypto.randomBytes(length).toString('hex').substr(0, length);
}

async function auth(ctx, roleId) {
  const token = ctx.get('Authorization').split(' ')[1];
  logger.info(`~ auth ~ token: ${token}`);
  if(!token) {
    ctx.throw(401, 'Unauthorized');
  }
  const storedData = await redis.get(token);
  if(!storedData) {
    ctx.throw(403, 'Forbidden');
  }
  ctx.state.user = storedData;
  logger.info(`token user --> ${JSON.stringify(storedData)}`);
  ctx.state.user.token = token;
  if(roleId && ctx.state.user.role_id < roleId) {
    ctx.throw(401, 'Unauthorized');
  }
}

export default {
  middleware(scopes) {
    return async (ctx, next) => {
      let found = false;
      for(let i=0, l=scopes.length; i<l && !found; i++) {
        if(scopes[i].method === ctx.method && scopes[i].path.test(ctx.path)) {
          found = true;
          switch(scopes[i].scope) {
            case 'user': {
              // eslint-disable-next-line no-await-in-loop
              await auth(ctx);
              break;
            }
            case 'publisher':
              // eslint-disable-next-line no-await-in-loop
              await auth(ctx, UserRoleEnum.publisher);
              break;
            case 'public':
              break;
            default:
              ctx.throw(500, `Invalid scope: ${scopes[i].scope}`);
          }
        }
      }
      if(!found) ctx.throw(404, 'Page not found from scopes middleware');
      return next();
    };
  },
  hash,
  verify,
  randomString,
};
