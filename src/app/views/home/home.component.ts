import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {TransactionService} from '../../services/transaction.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  legendTitle = 'Customers';
  showLabels = true;
  isDoughnut = false;
  legendPosition = 'below';
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  showYAxisLabel = true;
  yAxisLabel = 'Count';
  timeline = false;
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };

  customersChart = new Array();
  transactionCountChart = new Array();

  constructor(private toastr: ToastrService,
              private transactionService: TransactionService,
              private datePipe: DatePipe,
  ) {
  }

  ngOnInit(): void {
    this.transactionService.onResults().subscribe(results => {
      this.initChart(results.data);
      this.queryUserProfitByTime(results.data);
    });
  }

  initChart(items) {
    this.customersChart = new Array();
    const counts = new Map<string, number>();
    items.forEach(item => {
      let name = item.customerInfo.billingFirstName + ' ' + item.customerInfo.billingLastName;

      if (name == null || name.length === 0) {
        name = 'Unknown';
      }

      if (counts.has(name)) {
        counts.set(name, counts.get(name) + 1);
      } else {
        counts.set(name, 1);
      }
    });

    Array.from(counts.entries()).forEach(entry => {
      this.customersChart.push({name: entry[0], value: entry[1]});
    });
  }

  queryUserProfitByTime(items) {
    this.transactionCountChart = new Array();

    const counts = new Map<string, number>();
    items.forEach(item => {
      const createdAt = this.datePipe.transform(item.created_at, 'yyyy-MM-dd');

      if (createdAt == null) {
        return;
      }

      if (counts.has(createdAt)) {
        counts.set(createdAt, counts.get(createdAt) + 1);
      } else {
        counts.set(createdAt, 1);
      }
    });

    const temp = new Array();
    Array.from(counts.entries()).forEach(entry => {
      temp.push({name: new Date(entry[0]), value: entry[1]});
    });

    this.transactionCountChart.push({
      name: 'Count',
      series: temp
    });
  }

}
