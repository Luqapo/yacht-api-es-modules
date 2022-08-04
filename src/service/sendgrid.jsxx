import sgMail from '@sendgrid/mail';
import { readFile } from 'fs/promises';
import * as logger from '../utils/logger.js';

const env = process.env.NODE_ENV || 'test';

const configJson = JSON.parse(
  await readFile(
    new URL('../config/config.json', import.meta.url),
  ),
);

const config = configJson[env];

sgMail.setApiKey(config.sendgrid.api_key);

async function send({ to, subject, html }) {
  try {
    const result = await sgMail.send({ from: config.sendgrid.sender, to, html, subject });
    logger.info(result);
  } catch(err) {
    logger.error(err);
  }
}

export default {
  send,
};
