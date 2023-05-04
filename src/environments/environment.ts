// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const auth_server = {
  production: false,
  CLIENT_ID: 'client',
  CLIENT_SECRET: 'secret',
  CLIENT_SCOPE: 'openid',
  RESPONSE_TYPE: 'code',
  URL: 'http://localhost:8080',
  CLIENT_REDIRECT_URI: 'http://127.0.0.1:4200',
  CODE_CHALLENGE: 'QYPAZ5NU8yvtlQ9erXrUYR-T5AGCjCF47vN-KsaI2A8',
  CODE_CHALLENGE_METHOD: 'S256',
  GRANT_TYPE: 'authorization_code',
  CODE_VERIFIER: 'qPsH306-ZDDaOE8DFzVn05TkN3ZZoVmI_6x4LsVglQI',
};

export const environment = {
  production: false,
  //
  RESOURCE_SERVER_URL: 'http://localhost:9000/api',
  //
  AUTHORIZATION_CODE_URL: `${auth_server.URL}/oauth2/authorize?response_type=${auth_server.RESPONSE_TYPE}&client_id=${auth_server.CLIENT_ID}&scope=${auth_server.CLIENT_SCOPE}&redirect_uri=${auth_server.CLIENT_REDIRECT_URI}/authorized&code_challenge=${auth_server.CODE_CHALLENGE}&code_challenge_method=${auth_server.CODE_CHALLENGE_METHOD}`,
};

export const tokenURL = (code: string) => {
  return `${auth_server.URL}/oauth2/token?client_id=${auth_server.CLIENT_ID}&redirect_uri=${auth_server.CLIENT_REDIRECT_URI}/authorized&grant_type=${auth_server.GRANT_TYPE}&code=${code}&code_verifier=${auth_server.CODE_VERIFIER}`;
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
