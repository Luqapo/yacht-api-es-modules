import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { dynamicImport } from '../utils/import.js';

const __filename = fileURLToPath(import.meta.url);
const basename = path.basename(__filename);
type serviceObject = {
  [key: string]: any
}
const service: serviceObject = {};

async function addService(file: string, currentDir: string) {
  service[file.split('.')[0]] = await dynamicImport(`${currentDir}${file}`);
}

async function create() {
  const promises: any = [];
  const currentPathSplitted = fileURLToPath(import.meta.url).split('/');
  const currentDir = `/dist/${currentPathSplitted[currentPathSplitted.length - 2]}/`;

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
