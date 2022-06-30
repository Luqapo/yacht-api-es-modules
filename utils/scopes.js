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
    // getting all yachts
    path: /^\/yacht\/?$/,
    method: 'GET',
    scope: 'public',
  }, {
    // creating user
    path: /^\/yacht\/?$/,
    method: 'POST',
    scope: 'public',
  }, {
    // getting all routes from spec crag
    path: /^\/yacht\/filters\/?$/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting all harbor
    path: /^\/harbor\/?$/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting all harbor
    path: /^\/harbor\/?$/,
    method: 'POST',
    scope: 'public',
  }, {
    // getting one harbor
    path: /^\/harbor\/[a-zA-Z0-9]+$/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting all routes from spec crag
    path: /^\/harbor\/filters\/?$/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting all reservation
    path: /^\/reservation\/?$/,
    method: 'GET',
    scope: 'public',
  }, {
    // getting all reservation
    path: /^\/reservation\/?$/,
    method: 'POST',
    scope: 'public',
  }, {
    // getting one reservation
    path: /^\/reservation\/[a-zA-Z0-9]+$/,
    method: 'GET',
    scope: 'public',
  },
];
