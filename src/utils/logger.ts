/* eslint-disable no-console */
import colors from 'colors/safe.js';

export function debug(text: string) {
  return console.log(colors.blue(`${new Date().toISOString()} - ${text}`));
}

export function info(text: string) {
  return console.log(colors.yellow(`${new Date().toISOString()} - ${text}`));
}

export function error(text: string) {
  return console.log(colors.red(`${new Date().toISOString()} - ${text}`));
}

export function success(text: string) {
  return console.log(colors.green(`${new Date().toISOString()} - ${text}`));
}
