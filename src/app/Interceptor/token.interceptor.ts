import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';
import { Route, Router } from '@angular/router';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private router : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log(request)
    
    const token = this.tokenService.getToken()
    const thisRoute = this.router.url;
    const safeRoute1 = '/login';
    const safeRoute2 = '/register';
    const safeRoute3 = '';

    // SI token à insérer dans le header
    if(token !== null && thisRoute!=safeRoute1 && thisRoute!=safeRoute2 && thisRoute!=safeRoute3){
      let clone = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      })
      console.log(clone)
       return next.handle(clone).pipe(
         catchError(error => {
           console.log(error)
           console.log('error.status : ' + error.status)

           if(error.status === 403){
             this.tokenService.clearTokenExpired()
           }

          //  this.apiErrorService.sendError(error.error.message)
          return throwError('Session Expired')  
       })
       )
    }

    return next.handle(request);
    
  }
  
}



export const TokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true

  }

