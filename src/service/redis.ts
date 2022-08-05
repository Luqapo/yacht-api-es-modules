import { RedisClientType, createClient } from 'redis';
import * as logger from '../utils/logger.js';

import config from '../config/config.json' assert { type: 'json' };

let client: RedisClientType;

export function init() {
  client = createClient();
  client.on('error', (err: any) => {
    logger.error(`RedisClient: ${err.message}`);
  });
}

export async function get(key: string) {
  const data = await client.get(key) || '';

  return JSON.parse(data);
}

export function setex(key: string, value: any, lifetime: number) {
  return client.setEx(key, lifetime, JSON.stringify(value));
}

export function set(key: string, value: any, lifetime: number | null = null) {
  if(lifetime) {
    return setex(key, value, lifetime);
  }
  return client.set(key, JSON.stringify(value));
}

export function deleteKey(key: string) {
  return client.del(key);
}

export function ttl(key: string) {
  return client.ttl(key);
}

// export default {
//   init,
//   get,
//   set,
//   setex,
//   deleteKey,
//   ttl,
// };
