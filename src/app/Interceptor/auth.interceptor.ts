import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // const headers = new HttpHeaders().append('Authorization', `Bearer ${this.authService.getUser()}`);
    
    // const modifiedReq = req.clone({ headers });

    // return next.handle(modifiedReq);

    const token = localStorage.getItem('token');
    
    const authReq = req.clone({setHeaders: { Authorization: `Bearer ${token}` },});

    return next.handle(authReq);

  }
}
