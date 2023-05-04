import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { ResourceRequestInterceptor } from '../interceptor/resource-request-interceptor';
// import { TokenRequestInterceptor } from '../interceptor/token-request-interceptor';
import { Buffer } from 'buffer';
import {
  environment,
  auth_server,
  tokenURL,
} from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  
  private code: string = '';

  constructor(private http: HttpClient) {}

  public setCode(code: string) {
    this.code = code;
  }

  public getCode() {
    return this.code;
  }

  public isLoggedIn() : boolean
  {
    return sessionStorage.getItem('id_token') != null;
  }

  getToken() {
    // let url: string = tokenURL(this.code);
    let url: string = `http://localhost:8080/oauth2/token?client_id=client&redirect_uri=http://127.0.0.1:4200/authorized&grant_type=authorization_code&code=${this.code}&code_verifier=qPsH306-ZDDaOE8DFzVn05TkN3ZZoVmI_6x4LsVglQI
    `;
    //HTTP POST
    return this.http.post(url, null); // get id_token
  }
}
