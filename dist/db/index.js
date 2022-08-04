import pg from 'pg';
const env = process.env.NODE_ENV || 'test';
import config from '../config/config.json' assert { type: "json" };
console.log('🚀 ~ file: index.ts ~ line 8 ~ config', config);
const transactions = {};
let pool;
// async function release(clientId: Symbol) {
//   const client = transactions[clientId];
//   delete transactions[clientId];
//   if(client) {
//     // if there are any transactions roll back
//     try {
//       await client.query('ROLLBACK');
//     } catch(e) {
//       // ignore errors
//     }
//     try {
//       await client.release();
//     } catch(e) {
//       // ignore
//     }
//   }
//   return Promise.resolve();
// }
export function init() {
    pool = new pg.Pool(config.postgres);
}
// export async function cleanup() {
//   await Promise.all(Object.getOwnPropertySymbols(transactions).map(release));
//   const p = pool;
//   pool = null;
//   return p ? p.end() : Promise.resolve();
// }
/**
   * Starts new transaction, returns Symbol as transaction id.
   */
// export async function beginTransaction() {
//   const tr = Symbol(Date()); // not Date object, just string for debugging
//   const client = await pool?.connect();
//   client?.query('BEGIN');
//   transactions[tr] = client;
//   return tr;
// }
// export async function commit(transaction) {
//   if(!transactions[transaction]) throw new Error('No such transaction!');
//   const client = transactions[transaction];
//   await client.query('COMMIT');
//   delete transactions[transaction];
//   return client.release();
// }
// export async function rollback(transaction) {
//   if(!transactions[transaction]) throw new Error('No such transaction!');
//   const client = transactions[transaction];
//   await client.query('ROLLBACK');
//   delete transactions[transaction];
//   return client.release();
// }
/**
   * @param transaction (optional) transaction ID
   */
// export function query(transaction, ...args) {
//   if(typeof transaction === 'symbol') {
//     if(!transactions[transaction]) throw new Error('No such transaction!');
//     const q = args.shift();
//     if(config.postgres.debug) {
//       logger.debug(`Query: ${q}`);
//     }
//     if(args.length) {
//       return transactions[transaction].query(q, args);
//     }
//     return transactions[transaction].query(q);
//   }
// if not instance of Symbol then no transaction given, it's first
// argument for postgres, i.e. SQL query string.
//   if(config.postgres.debug) {
//     logger.debug(`Query: ${transaction}`);
//   }
//   if(args.length) {
//     return pool.query(transaction, args);
//   }
//   return pool.query(transaction);
// }
