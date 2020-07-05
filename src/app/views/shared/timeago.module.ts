import {NgModule, Pipe} from '@angular/core';
import {TimeAgoPipe} from 'time-ago-pipe';

@Pipe({
  name: 'timeAgo',
  pure: false
})

export class TimeAgoExtendsPipe extends TimeAgoPipe {
}

@NgModule({
  imports: [],
  declarations: [
    TimeAgoExtendsPipe
  ],
  exports: [
    TimeAgoExtendsPipe
  ]
})
export class TimeagoModule {
}
