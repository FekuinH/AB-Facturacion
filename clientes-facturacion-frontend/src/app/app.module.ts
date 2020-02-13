import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormularioClientesComponent } from './clientes/formulario-clientes.component';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { PaginatorComponent } from './paginator/paginator.component';
import { DetallesComponent } from './clientes/detalles/detalles.component';
import { LoginComponent } from './usuarios/login.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { RolGuard } from './usuarios/guards/rol.guard';
import {TokenInterceptor} from './usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from './usuarios/interceptors/auth.interceptor';
import { DetalleFacturaComponent } from './facturas/detalle-factura.component';
import { FacturasComponent } from './facturas/facturas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

const ROUTES: Routes = [
{path: '', redirectTo: '/clientes', pathMatch: 'full'},
{path: 'clientes', component: ClientesComponent},
{path: 'clientes/form', component: FormularioClientesComponent, canActivate:[AuthGuard, RolGuard], data: {role:'ROLE_ADMIN'}},
{path: 'clientes/form/:id',component: FormularioClientesComponent, canActivate:[AuthGuard, RolGuard], data: {role:'ROLE_ADMIN'}},
{path: 'clientes/page/:page', component: ClientesComponent},
{path: 'clientes/page', component: ClientesComponent},
{path: 'login', component: LoginComponent},
{path: 'facturas/:id',component: DetalleFacturaComponent, canActivate:[AuthGuard, RolGuard], data: {role:'ROLE_USER'}},
{path: 'facturas/form/:clienteId',component: FacturasComponent, canActivate:[AuthGuard, RolGuard], data: {role:'ROLE_ADMIN'}}

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientesComponent,
    FormularioClientesComponent,
    PaginatorComponent,
    DetallesComponent,
    LoginComponent,
    DetalleFacturaComponent,
    FacturasComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule


  ],
  providers: [
    ClienteService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
