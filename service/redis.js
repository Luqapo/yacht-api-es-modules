import redis from 'redis';
import { readFile } from 'fs/promises';
import * as logger from '../utils/logger.js';

const env = process.env.NODE_ENV || 'test';

const configJson = JSON.parse(
  await readFile(
    new URL('../config/config.json', import.meta.url),
  ),
);

const config = configJson[env];

let client;

function init() {
  client = redis.createClient(config.redis);
  client.on('error', (err) => {
    logger.error('RedisClient', err.message);
  });
}

function get(key) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, rows) => {
      if(err) {
        reject(err);
      }
      resolve(JSON.parse(rows));
    });
  });
}

function setex(key, value, lifetime) {
  return new Promise((resolve, reject) => {
    client.set(key, JSON.stringify(value), 'EX', lifetime, (err) => {
      if(err) {
        reject(err);
      }
      resolve(true);
    });
  });
}

function set(key, value, lifetime = null) {
  if(lifetime) {
    return setex(key, value, lifetime);
  }
  return new Promise((resolve, reject) => {
    client.set(key, JSON.stringify(value), (err) => {
      if(err) {
        reject(err);
      }
      resolve(true);
    });
  });
}

function deleteKey(key) {
  return new Promise((resolve, reject) => {
    client.del(key, (err) => {
      if(err) {
        reject(err);
      }
      resolve();
    });
  });
}

function ttl(key) {
  return new Promise((resolve, reject) => {
    client.ttl(key, (err, res) => {
      if(err) {
        reject(err);
      }
      resolve(res);
    });
  });
}

export default {
  init,
  get,
  set,
  setex,
  deleteKey,
  ttl,
};
