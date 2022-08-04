// TODO: think about better solution
export default [
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
    path: /^\/user\/confirm\/?$/,
    method: 'GET',
    scope: 'public',
  }, {
    // confirm user email
    path: /^\/user\/recover\/?$/,
    method: 'POST',
    scope: 'public',
  }, {
    // getting all areas
    path: /^\/region\/?$/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting all routes from spec crag
    path: /^\/region\/filters\/?$/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting all area
    path: /^\/area\/?$/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting one area
    path: /^\/area\/[a-zA-Z0-9]+$/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting all routes from spec crag
    path: /^\/area\/filters\/?$/,
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
    // getting all crags from spec area
    path: /^\/crag\/?$/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting all crags from spec area
    path: /^\/crag\/[a-zA-Z0-9]+$/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting all routes from spec crag
    path: /^\/crag\/filters\/?$/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting all routes from spec crag
    path: /^\/route\/?$/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting all routes from spec crag
    path: /^\/route\/filters\/?$/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting all routes from spec crag
    path: /^\/route\/one\/[0-9]+$/,
    method: 'GET',
    scope: 'public',
  },
  {
    // getting all routes from spec crag
    path: /^\/search\/?$/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting all routes from spec crag
    path: /^\/search\/filters\/?$/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting all routes from spec crag
    path: /^\/gym\/?$/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting all routes from spec crag
    path: /^\/gym\/?$/,
    method: 'POST',
    scope: 'user',
  }, {
    // getting all routes from spec crag
    path: /^\/gym\/filters\/?$/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting all routes from spec crag
    path: /^\/gym\/voivodeship\/?$/,
    method: 'GET',
    scope: 'public',
  }, {
    path: /^\/gym\/town\/?$/,
    method: 'GET',
    scope: 'public',
  }, {
    path: /^\/gym\/activity\/[0-9]+$/,
    method: 'GET',
    scope: 'public',
  }, {
    path: /^\/gym\/activity\/filters\/?$/,
    method: 'GET',
    scope: 'public',
  }, {
    path: /^\/gym\/comment\/activity$/,
    method: 'POST',
    scope: 'user',
  }, {
    path: /^\/gym\/activity\/[0-9]+$/,
    method: 'POST',
    scope: 'user',
  }, {
    // getting all routes from spec crag
    path: /^\/gym\/activity\/?$/,
    method: 'POST',
    scope: 'user',
  }, {
    // getting all routes from spec crag
    path: /^\/message\/filters\/?$/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting all routes from spec crag
    path: /^\/message\/?$/,
    method: 'GET',
    scope: 'user',
  }, {
    // getting all routes from spec crag
    path: /^\/message\/?$/,
    method: 'POST',
    scope: 'user',
  },
];
