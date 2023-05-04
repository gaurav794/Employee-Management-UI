import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { auth_server } from 'src/environments/environment';
import { Buffer } from 'buffer';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenRequestInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let request = req.clone();

    if (
      sessionStorage.getItem('id_token') == null &&
      request.method === 'POST' &&
      request.url.includes('token') //Prevent from executing while registering user
    ) {
      //basic authentication
      const BASIC_AUTH =
        `Basic ` +
        Buffer.from(
          `${auth_server.CLIENT_ID}:${auth_server.CLIENT_SECRET}`
        ).toString('base64');
      //headers
      const headers = new HttpHeaders({
        'content-type': 'application/json',
        Authorization: BASIC_AUTH,
      });

      request = req.clone({ headers: headers });
    }
    return next.handle(request);
  }
}
