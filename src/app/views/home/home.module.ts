import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {SearchModule} from '../../components/search/search.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxChartsModule,
    SearchModule
  ],
  exports: [],
})
export class HomeModule {
}
