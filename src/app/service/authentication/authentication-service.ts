import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServerUtilService } from '../server-details-util/server-util';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private code: string = '';

  constructor(private http: HttpClient, private server: ServerUtilService) {}

  public setCode(code: string) {
    this.code = code;
  }

  public getCode() {
    return this.code;
  }

  public isLoggedIn(): boolean {
    return sessionStorage.getItem('id_token') != null;
  }

  getToken() {
    let url: string = this.server.getTokenURL(this.code);
    //HTTP POST
    return this.http.post(url, null); // get id_token
  }
}
