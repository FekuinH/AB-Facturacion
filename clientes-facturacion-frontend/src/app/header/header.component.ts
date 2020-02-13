import { Component, OnInit } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  title: string = "AB-Facturacion";
    
  constructor(
    public authService: AuthService,
    private router: Router
    ) {}

  ngOnInit() {
  }

  logOut():void {

    
    swal('Logout','Ha cerrado sesión correctamente','success');
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

}
