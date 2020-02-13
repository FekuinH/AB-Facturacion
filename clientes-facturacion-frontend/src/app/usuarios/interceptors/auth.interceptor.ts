import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router){};    

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
  

    return next.handle(req).pipe(
      catchError(e =>{
        if (e.status === 401) {

          if (this.authService.isAuthenticated()) {
            this.authService.logOut();
          }
          this.router.navigate(['/login']);
         
        }
        if (e.status === 403) {
          swal('Acceso denegado', 'No tienes los permisos para acceder a este recurso', 'warning');
          this.router.navigate(['/clientes']);
        }
        return throwError(e);
      })
    )
  }
}