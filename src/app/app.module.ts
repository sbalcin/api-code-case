import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {AppComponent} from './app.component';
import {P404Component} from './views/error/404.component';
import {P500Component} from './views/error/500.component';
import {AppAsideModule, AppBreadcrumbModule, AppFooterModule, AppHeaderModule, AppSidebarModule} from '@coreui/angular';
import {AppRoutingModule} from './app-routing.module';
import {NgxSpinnerModule} from 'ngx-spinner';
import {TimeagoModule} from './views/shared/timeago.module';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {LoginComponent} from './views/login/login.component';
import {SearchModule} from './components/search/search.module';
import {TokenHandler} from './help/token-handler';
import {ErrorHandler} from './help/error-handler';
import {LayoutComponent} from './components/layout/layout.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const APP_CONTAINERS = [
  LayoutComponent,
];

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    HttpClientModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    TabsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    TimeagoModule,
    SearchModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: TokenHandler, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandler, multi: true }
  ],
  bootstrap: [AppComponent],

})
export class AppModule {
}
