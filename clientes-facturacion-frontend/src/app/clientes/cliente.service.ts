import { Injectable } from '@angular/core';
import { Cliente } from './Cliente'
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Region } from './region';
import { AuthService } from '../usuarios/auth.service';
import { URL_BACKEND } from '../config/config';



@Injectable()
export class ClienteService {


  private urlEndPoint: string = URL_BACKEND + '/api/clientes';
  
  constructor(private http: HttpClient, private router: Router) { }

  /*  private agregarAutorizathionHeader() {
     let token = this.authService.token;
     if (token != null) {
       return this.httpHeaders.append('Authorization', 'Bearer ' + token);
     }
     return this.httpHeaders;
   }
  */

  getClientes(page): Observable<any> {
    //return of (CLIENTES);

    //return this.http.get<Cliente[]>(this.urlEndPoint);

    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map((jsonClientesResponse: any) => {
        (jsonClientesResponse.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          cliente.fechaIngreso = formatDate(cliente.fechaIngreso, "dd-MM-yyyy", 'en-US')
          return cliente;
        });
        return jsonClientesResponse;
      })
    );

  }

  agregarCliente(cliente: Cliente): Observable<any> {

    return this.http.post<any>(this.urlEndPoint, cliente).pipe(
      catchError(e => {

        if (e.status === 400) {
          return throwError(e);
        }
      })
    );
  }

  getCliente(id: number): Observable<Cliente> {

    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401) {
          this.router.navigate(['/clientes']);
        }
        return throwError(e);
      })
    );
  }

  editarCliente(cliente: Cliente): Observable<Cliente> {

    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.idCliente}`, cliente).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        return throwError(e);
      })
    )
  }

  eliminarCliente(id: number): Observable<Cliente> {

    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      }
      )
    );

  }

  subirFoto(archivo: File, idCliente): Observable<Cliente> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", idCliente);


    return this.http.post(`${this.urlEndPoint}/upload`, formData).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        return throwError(e);
      })
    );
  }

  getRegiones(): Observable<Region[]> {

    return this.http.get<Region[]>(this.urlEndPoint + '/regiones');



    /* pipe(
      catchError(e => {
        this.isAutorizado(e);
        return throwError(e);
      })
    ); */

  }

  /*  private isAutorizado(e: any): boolean {
     console.log(e.status);
     if (e.status === 401) {
 
       if (this.authService.isAuthenticated()) {
         this.authService.logOut();
       }
       this.router.navigate(['/login']);
       return false;
     }
     if (e.status === 403) {
       swal('Acceso denegado', 'No tienes los permisos para acceder a este recurso', 'warning');
       this.router.navigate(['/clientes']);
     }
     return true;
   } */

}
