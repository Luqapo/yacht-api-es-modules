import { readFile } from 'fs/promises';
import { User } from '../model/user.js';
import redis from './redis.js';
import auth from './auth.js';
import * as sendgrid from './sendgrid.js';
import * as logger from '../utils/logger.js';
import getRegisterTemplate from '../templates/register.js';
import getRecoverTemplate from '../templates/recover.js';
import { ApiError } from '../utils/error.js';

const env = process.env.NODE_ENV || 'test';

const configJson = JSON.parse(
  await readFile(
    new URL('../config/config.json', import.meta.url),
  ),
);

const config = configJson[env];

const UserTypeEnum = {
  INTERNAL: 1,
  GOOGLE: 2,
  FACEBOOK: 3,
};

async function register(user) {
  const userInDatabase = (await User.find({ fields: 'id,email', where: { email: user.email } })).rows[0];
  if(userInDatabase) {
    throw new ApiError('Email already exists', 400);
  }
  const cached = await redis.get(`register-${user.email}`);
  let ttl = config.register_token_ttl;
  if(!cached) {
    const token = auth.randomString();
    logger.info(`~ register ~ token: ${token}`);
    user.password = auth.hash(user.password);
    user.token = token;
    await redis.set(`register-${user.email}`, user, ttl);
    const html = getRegisterTemplate(token, config.api_address, user.email);
    await sendgrid.send({ to: user.email, subject: 'Dokończ rejstrację', html });

    return { token, ttl };
  }
  ttl = redis.ttl(user.email);

  return { ttl };
}

async function confirm(token, email) {
  const storedData = await redis.get(`register-${email}`);
  if(!storedData) {
    throw new ApiError('Invalid token', 400);
  }
  if(token !== storedData.token) {
    throw new ApiError('Wrong token', 400);
  }
  delete storedData.token;
  await User.create({ ...storedData, type: UserTypeEnum.INTERNAL });
  await redis.deleteKey(`register-${email}`);
}

async function recover({ email }) {
  const userInDatabase = (await User.find({ fields: 'id,email', where: { email } })).rows[0];
  if(!userInDatabase) {
    throw new Error('CannotFindUser', { code: 404 });
  }
  const newPass = auth.randomString();
  const newHashedPass = auth.hash(newPass);
  await User.updatePassword(newHashedPass, userInDatabase.id);
  const html = getRecoverTemplate(newPass);
  await sendgrid.send({ to: email, subject: 'Odzyskaj konto', html });

  return 'success';
}

async function login({ email, password }) {
  const userInDatabase = (await User.find({ where: { email } })).rows[0];
  if(!userInDatabase) {
    throw new ApiError('Invalid email', 404);
  }
  if(!auth.verify(password, userInDatabase.password)) {
    throw new ApiError('Wrong password', 401);
  }
  const token = auth.randomString(32);
  const { id, role_id, name: user_name } = userInDatabase;
  await redis.set(token, {
    id: userInDatabase.id,
    email,
    role_id: userInDatabase.role_id,
    user_name,
  });

  return { token, id, email, role_id, user_name };
}

async function logout({ firebase_token }, { id: user_id, token }) {
  await redis.deleteKey(token);
  await User.removeFirebaseToken({ token: firebase_token, user_id });
}

export default {
  register,
  confirm,
  recover,
  login,
  logout,
};
