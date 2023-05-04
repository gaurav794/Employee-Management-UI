import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ToastService } from '../toast/toast.service';
import { RestResponseStatus } from '../../interface/rest-response-status';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private toastService: ToastService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        error: (e) => {
          if (e instanceof HttpErrorResponse) {
            if (e.status == 0)
              this.toastService.show(
                'ERR_CONNECTION_REFUSED',
                'Unable To Connect To The Server',
                8000
              );
            else if (e.status == 401) {
              this.toastService.show(
                'UNAUTHORIZED',
                'Could not authenticate the user.',
                8000
              );
            } else {
              let errData: RestResponseStatus = e.error;
              this.toastService.show(errData.status, errData.message, 8000);
            }
          }
        },
      })
    );
  }
}
