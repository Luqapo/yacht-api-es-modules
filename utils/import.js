import { pathToFileURL } from 'url';
import * as logger from './logger.js';

export const baseURL = pathToFileURL(process.cwd()).href;

export const silentImport = (path, el = 'default') => import(baseURL + path)
  .then((i) => i[el] || i)
  .catch((e) => logger.error(e.message));
