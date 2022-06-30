import fs from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';
import combineRouters from 'koa-combine-routers';
import { silentImport } from '../utils/import.js';

const __filename = fileURLToPath(import.meta.url);
const basename = path.basename(__filename);
const routers = [];

async function addRouter(file) {
  routers.push(await silentImport(file));
}

async function create() {
  const promises = [];
  const currentPathSplitted = pathToFileURL(import.meta.url).pathname.split('/');
  const currentDir = `/${currentPathSplitted[currentPathSplitted.length - 2]}/`;

  fs
    .readdirSync(`${path.resolve()}${currentDir}`)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
      promises.push(addRouter(`${currentDir}${file}`));
    });

  await Promise.all(promises);

  const router = combineRouters(routers);
  return router;
}

export default create();
