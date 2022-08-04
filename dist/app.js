import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import { RequestContext } from '@mikro-orm/core';
import { dynamicImport } from './utils/import.js';
import * as db from './db/index.js';
import * as logger from './utils/logger.js';
const router = await dynamicImport('/dist/routes/index.js');
// const service = await dynamicImport('/service/index.js');
const PORT = process.env.PORT || 3000;
let appPromise;
const app = new Koa();
app.use(cors());
app.use(bodyParser({
    enableTypes: ['json'],
}));
app.use(async (ctx, next) => {
    logger.info(`Req path: ${ctx.URL.pathname}`);
    if (Object.keys(ctx.query).length) {
        logger.info(JSON.stringify(ctx.query));
    }
    try {
        await next();
    }
    catch (err) {
        logger.error('app middleware: ' + err);
        ctx.status = err.statusCode || err.code || 500;
        ctx.body = { error: err.message };
    }
});
// app.use(service.auth.middleware(scopes));
app.use((ctx, next) => RequestContext.createAsync(db.DI.orm.em, next));
app.use(router());
function init() {
    if (!appPromise) {
        // eslint-disable-next-line no-async-promise-executor
        appPromise = new Promise(async (resolve) => {
            await db.init();
            // service.redis.init();
            app.listen(PORT, () => {
                logger.success(`Server running in ${process.env.NODE_ENV} and listen on ${PORT}`);
                resolve(app);
            });
        });
    }
    return appPromise;
}
init();
export default init;
