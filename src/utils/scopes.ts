export type Scope = {
  path: RegExp;
  method: string;
  scope: string;
};

// TODO: think about better solution
export const scopes: Scope[] = [
  {
    path: /^\/user\/login/,
    method: 'POST',
    scope: 'public',
  }, {
    path: /^\/user\/logout/,
    method: 'POST',
    scope: 'user',
  }, {
    // creating user
    path: /^\/user\/firebaseToken/,
    method: 'POST',
    scope: 'user',
  }, {
    // creating user
    path: /^\/user\/?$/,
    method: 'POST',
    scope: 'public',
  }, {
    // getting own user
    path: /^\/user\/?$/,
    method: 'GET',
    scope: 'user',
  }, {
    // confirm user email
    path: /^\/user\/confirm/,
    method: 'GET',
    scope: 'public',
  }, {
    // confirm user email
    path: /^\/user\/recover\/?$/,
    method: 'POST',
    scope: 'public',
  }, {
    // getting all yacht
    path: /^\/yacht/,
    method: 'POST',
    scope: 'public',
  }, {
    // getting all yacht
    path: /^\/yacht/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting one yacht
    path: /^\/yacht\/[a-zA-Z0-9]+$/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting all routes from spec crag
    path: /^\/yacht\/filters\/?$/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting sector
    path: /^\/sector\/?$/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting sector
    path: /^\/sector\/[a-zA-Z0-9]+$/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting all routes from spec crag
    path: /^\/sector\/filters\/?$/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting all crags from spec yacht
    path: /^\/crag\/?$/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting all crags from spec yacht
    path: /^\/crag\/[a-zA-Z0-9]+$/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting all routes from spec crag
    path: /^\/crag\/filters\/?$/,
    method: 'GET',
    scope: 'public',
  },
];
