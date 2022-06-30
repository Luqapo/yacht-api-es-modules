import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { silentImport } from '../utils/import.js';

const __filename = fileURLToPath(import.meta.url);
const basename = path.basename(__filename);
const service = {};

async function addService(file, currentDir) {
  service[file.split('.')[0]] = await silentImport(`${currentDir}${file}`);
}

async function create() {
  const promises = [];
  const currentDir = '/service/';
  fs
    .readdirSync(`${path.resolve()}${currentDir}`)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
      promises.push(addService(file, currentDir));
    });

  await Promise.all(promises);

  return service;
}

export default create();
