import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
    ){};

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (!this.authService.isAuthenticated()){
        this.router.navigate(['/login']);
        return false;
      }


      let rol = next.data['role'] as string;
      console.log(rol);
      if(this.authService.tienePermisos(rol)){
        return true;
      }

      this.router.navigate(['/clientes']);
      swal('Acceso denegado', 'No tienes los permisos para acceder a este recurso', 'warning');
    return false;
  }
  
}
