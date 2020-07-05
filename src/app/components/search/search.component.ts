import {Component, OnInit} from '@angular/core';
import {TransactionService} from '../../services/transaction.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {TransactionListRequest} from '../../models/transaction-list-request';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public form: FormGroup;
  public req: TransactionListRequest;

  public statusSelect =
    [
      {uuid: 'APPROVED', label: 'APPROVED'},
      {uuid: 'WAITING', label: 'WAITING'},
      {uuid: 'DECLINED', label: 'DECLINED'},
      {uuid: 'ERROR', label: 'ERROR'}
    ];
  public operationSelect =
    [
      {uuid: 'DIRECT', label: 'DIRECT'},
      {uuid: 'REFUND', label: 'REFUND'},
      {uuid: '3D', label: '3D'},
      {uuid: '3DAUTH', label: '3DAUTH'},
      {uuid: 'STORED', label: 'STORED'}
    ];
  public paymentMethodSelect =
    [
      {uuid: 'CREDITCARD', label: 'CREDITCARD'},
      {uuid: 'CUP', label: 'CUP'},
      {uuid: 'IDEAL', label: 'IDEAL'},
      {uuid: 'GIROPAY', label: 'GIROPAY'},
      {uuid: 'STORED', label: 'STORED'},
      {uuid: 'MISTERCASH', label: 'MISTERCASH'},
      {uuid: 'PAYTOCARD', label: 'PAYTOCARD'},
      {uuid: 'CEPBANK', label: 'CEPBANK'},
      {uuid: 'CITADEL', label: 'CITADEL'},
    ];
  public filterSelect =
    [
      {uuid: 'Transaction UUID', label: 'Transaction UUID'},
      {uuid: 'Customer Email', label: 'Customer Email'},
      {uuid: 'Reference No', label: 'Reference No'},
      {uuid: 'Custom Data', label: 'Custom Data'},
      {uuid: 'Card PAN', label: 'Card PAN'}
    ];

  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
  ) {

    const firtDate = new Date();
    firtDate.setDate(firtDate.getDate() - 1000);

    this.form = formBuilder.group({
      fromDate: [this.datePipe.transform(firtDate, 'yyyy-MM-dd'), [Validators.required]],
      toDate: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), [Validators.required]],
      status: new FormControl(),
      operation: new FormControl(),
      paymentMethod: new FormControl(),
      errorCode: new FormControl(),
      filterField: new FormControl(),
      transaction: new FormControl(),
      filterValue: new FormControl(),
      name: new FormControl(),
      page: 1
    });
  }

  ngOnInit(): void {

    this.transactionService.onCurrentPageChange().subscribe(results => {
      if (results) {
        this.form.value.page = results;
        this.query();
      }
    });
    this.query();
  }

  async query() {
    this.req = new TransactionListRequest();
    this.req.fromDate = this.form.value.fromDate;
    this.req.toDate = this.form.value.toDate;
    this.req.status = this.form.value.status;
    this.req.filterField = this.form.value.filterField;
    this.req.filterValue = this.form.value.filterValue;
    this.req.operation = this.form.value.operation;
    this.req.paymentMethod = this.form.value.paymentMethod;
    this.req.page = this.form.value.page;
    this.transactionService.search(this.req);
  }

  applyFilter(newForm) {
    this.query();
  }

  changeFilter(type, newValue) {
    switch (type) {
      case 'status':
        this.form.value.status = 'reset' === newValue ? null : newValue;
        break;
      case 'operation':
        this.form.value.operation = 'reset' === newValue ? null : newValue;
        break;
      case 'payment':
        this.form.value.paymentMethod = 'reset' === newValue ? null : newValue;
        break;
      case 'filter':
        this.form.value.filterField = 'reset' === newValue ? null : newValue;
        break;
    }
  }

}
