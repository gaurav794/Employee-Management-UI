import { Injectable } from '@angular/core';

// Should be fetched and implemented via api
@Injectable({ providedIn: 'root' })
export class ServerUtilService {
  constructor() {}

  getTokenURL(code: string): string {
    return `${this.getAuthServer().URL}/oauth2/token?client_id=${
      this.getAuthServer().CLIENT_ID
    }&redirect_uri=${
      this.getAuthServer().CLIENT_REDIRECT_URI
    }/authorized&grant_type=${
      this.getAuthServer().GRANT_TYPE
    }&code=${code}&code_verifier=${this.getAuthServer().CODE_VERIFIER}`;
  }

  getAuthServer() {
    const auth_server = {
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

    return auth_server;
  }

  getServerUrl() {
    const url = {
      RESOURCE: 'http://localhost:9000/api',
      AUTHORIZATION_CODE: `${
        this.getAuthServer().URL
      }/oauth2/authorize?response_type=${
        this.getAuthServer().RESPONSE_TYPE
      }&client_id=${this.getAuthServer().CLIENT_ID}&scope=${
        this.getAuthServer().CLIENT_SCOPE
      }&redirect_uri=${
        this.getAuthServer().CLIENT_REDIRECT_URI
      }/authorized&code_challenge=${
        this.getAuthServer().CODE_CHALLENGE
      }&code_challenge_method=${this.getAuthServer().CODE_CHALLENGE_METHOD}`,
    };

    return url;
  }
}
