import { User } from '../entities/index.js';
import * as redis from './redis.js';
import auth from './auth.js';
import * as sendgrid from './sendgrid.js';
import * as logger from '../utils/logger.js';
import { registerTemplate } from '../templates/register.js';
// import { recoverTemplate } from '../templates/recover.js';
import { ApiError } from '../utils/error.js';
import { DI } from '../db/index.js';

import config from '../config/config.json' assert { type: 'json' };

console.log('🚀 ~ file: user.ts ~ line 3 ~ redis', redis);

enum UserTypeEnum {
  INTERNAL = 1,
  GOOGLE,
  FACEBOOK,
}

interface CachedUser {
  password: string
  token?: string
  email: string
}

async function register(user: User) {
  const userInDatabase = await DI.userRepository.findOne({ email: user.email });
  if(userInDatabase) {
    throw new ApiError('Email already exists', 400);
  }
  const cached = await redis.get(`register-${user.email}`);
  let ttl = config.register_token_ttl;
  if(!cached) {
    const token = auth.randomString();
    logger.info(`~ register ~ token: ${token}`);
    const cachedUser: CachedUser = { ...user };
    cachedUser.password = auth.hash(user.password);
    cachedUser.token = token;
    await redis.set(`register-${user.email}`, cachedUser, ttl);
    const html = registerTemplate(token, config.api_address, user.email);
    await sendgrid.send({ to: user.email, subject: 'Dokończ rejstrację', html });

    return { token, ttl };
  }
  ttl = await redis.ttl(user.email);

  return { ttl };
}

async function confirm(token: string, email: string) {
  const storedData = await redis.get(`register-${email}`);
  if(!storedData) {
    throw new ApiError('Invalid token', 400);
  }
  if(token !== storedData.token) {
    throw new ApiError('Wrong token', 400);
  }
  delete storedData.token;
  await DI.userRepository.create({ ...storedData, type: UserTypeEnum.INTERNAL });
  await redis.deleteKey(`register-${email}`);
}

// async function recover({ email }) {
//   const userInDatabase = DI.userRepository.findOne({ email });
//   if(!userInDatabase) {
//     throw new ApiError('CannotFindUser', 404);
//   }
//   const newPass = auth.randomString();
//   const newHashedPass = auth.hash(newPass);
//   await DI.userRepository.nativeUpdate({ id: userInDatabase.id }, { password: newHashedPass });
//   const html = recoverTemplate(newPass);
//   await sendgrid.send({ to: email, subject: 'Odzyskaj konto', html });

//   return 'success';
// }

async function login({ email, password }: { email: string, password: string }) {
  const userInDatabase = await DI.userRepository.findOne({ email });
  if(!userInDatabase) {
    throw new ApiError('Invalid email', 404);
  }
  if(!auth.verify(password, userInDatabase.password)) {
    throw new ApiError('Wrong password', 401);
  }
  const token = auth.randomString(32);
  const { id, role_id: roleId, name: userName } = userInDatabase;
  await redis.set(token, {
    id: userInDatabase.id,
    email,
    roleId,
    userName,
  });

  return { token, id, email, roleId, userName };
}

async function logout({ id, token }: { id: number, token: string }) {
  await redis.deleteKey(token);
  await DI.userRepository.nativeUpdate(id, { firebase_token: null });
}

export default {
  register,
  confirm,
  // recover,
  login,
  logout,
};
