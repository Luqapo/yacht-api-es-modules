import Koa from 'koa';
declare function init(): Promise<Koa<Koa.DefaultState, Koa.DefaultContext>>;
export default init;
