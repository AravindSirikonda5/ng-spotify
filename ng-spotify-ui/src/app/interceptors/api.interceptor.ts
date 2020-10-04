import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { SpotifyService } from './../services/spotify.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private spotifyService: SpotifyService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let reqCopy = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });

    return next.handle(reqCopy).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          return this.spotifyService.getAccessToken().pipe(
            switchMap((res) => {
              localStorage.setItem('token', res.access_token);
              reqCopy = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + res.access_token)
              });
              return next.handle(reqCopy);
            })
          );
        } else {
          const errMsg = err && err.error && err.error.error ? err.error.error.message : 'Error getting data';
          return throwError(errMsg);
        }
      })
    );
  }
}
