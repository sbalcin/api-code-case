import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import {ToastrModule} from 'ngx-toastr';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    RouterModule,
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot(),
  ]
})
export class LoginModule {
}
