import sgMail from '@sendgrid/mail';
import * as logger from '../utils/logger.js';

import config from '../config/config.json' assert { type: 'json' };

sgMail.setApiKey(config.sendgrid.api_key);

export async function send({ to, subject, html }: { to: string; subject: string, html: string }) {
  try {
    const result = await sgMail.send({ from: config.sendgrid.sender, to, html, subject });
    logger.info(JSON.stringify(result));
  } catch(err: any) {
    logger.error(err);
  }
}
