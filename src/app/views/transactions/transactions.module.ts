import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TransactionsRoutingModule} from './transactions-routing.module';
import {TransactionsComponent} from './transactions.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {ToastrModule} from 'ngx-toastr';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {SearchModule} from '../../components/search/search.module';

@NgModule({
  declarations: [TransactionsComponent],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TabsModule,
    SearchModule,
  ],
  exports: [],
})
export class TransactionsModule {
}
