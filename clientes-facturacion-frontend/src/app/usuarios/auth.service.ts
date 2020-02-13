import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_BACKEND } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario;
  private _token: string;

  constructor(private http: HttpClient) { }

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token')
      return this._token;
    }
    return null;
  }


  public logIn(usuario: Usuario): Observable<any> {

    const urlEndPoint = URL_BACKEND + '/oauth/token';

    const credenciales = btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders(
      {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + credenciales
      });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.userName);
    params.set('password', usuario.password);
    console.log(params.toString());
    return this.http.post<any>(urlEndPoint, params.toString(), { headers: httpHeaders });
  }

  public guardarUsuario(accessToken: string): void {
    let payLoad = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.userName = payLoad.user_name;
    this._usuario.roles = payLoad.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  public guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  public obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  public isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }


  logOut(){
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }

  tienePermisos(rol: string):boolean{

    return this.usuario.roles.includes(rol);
  }

}