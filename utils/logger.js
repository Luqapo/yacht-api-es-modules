/* eslint-disable no-console */
import colors from 'colors/safe.js';

export function debug(text) {
  return console.log(colors.blue(`${new Date().toISOString()} - ${text}`));
}

export function info(text) {
  return console.log(colors.yellow(`${new Date().toISOString()} - ${text}`));
}

export function error(text) {
  return console.log(colors.red(`${new Date().toISOString()} - ${text}`));
}

export function success(text) {
  return console.log(colors.green(`${new Date().toISOString()} - ${text}`));
}
