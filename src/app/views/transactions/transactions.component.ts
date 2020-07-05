import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {TransactionService} from '../../services/transaction.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {MdbTableDirective, ModalDirective} from 'angular-bootstrap-md';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {TransactionRequest} from '../../models/transation-request';
import {Daum} from '../../models/transaction-list-response';


@Component({
  selector: 'app-home',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({transform: 'translateX(0)'})),
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('0.2s 100ms ease-in')
      ]),
      transition(':leave', [
        animate('0.1s ease-out', style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class TransactionsComponent implements OnInit {

  @ViewChild(MdbTableDirective, {static: false}) mdbTable: MdbTableDirective;
  @ViewChild('basicModal', {static: false}) processingModal: ModalDirective;


  items: Daum[];
  wholeItems: Daum[];
  currentPage = 1;
  public form: FormGroup;

  searchText = '';

  customerName;
  customerInfoSpesc;
  transactionSpesc;
  clientSpesc;

  constructor(
    private transactionService: TransactionService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
  ) {
  }

  ngOnInit(): void {
    this.transactionService.onResults().subscribe(results => {
      this.items = results.data;
      this.wholeItems = results.data;
    });
  }

  @HostListener('input') oninput() {
    this.searchItems();
  }

  searchItems() {
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.wholeItems);
      this.items = this.mdbTable.getDataSource();
    } else {
      this.items = this.wholeItems.filter((item) => item.customerInfo && item.customerInfo.billingFirstName.toLowerCase().includes(this.searchText.toLowerCase()));
      this.mdbTable.setDataSource(this.items);
    }
  }

  showModal(item) {

    const request = new TransactionRequest();
    request.transactionId = item.transaction.merchant.transactionId;
    this.transactionService.transaction(request).subscribe(response => {
      if (response.customerInfo) {
        this.customerName = response.customerInfo ? response.customerInfo.billingFirstName + ' ' + response.customerInfo.billingLastName : '';

        this.customerInfoSpesc = new Map();
        Object.keys(response.customerInfo).forEach(key => {
          this.customerInfoSpesc.set(key, response.customerInfo[key]);
        });
      }

      if (response.transaction) {
        this.transactionSpesc = new Map();
        Object.keys(response.transaction.merchant).forEach(key => {
          if ('agent' === key) {
            return;
          }
          this.transactionSpesc.set(key, response.transaction.merchant[key]);
        });
      }
    });

    this.transactionService.client(request).subscribe(response => {
      if (response.customerInfo) {
        this.clientSpesc = new Map();
        Object.keys(response.customerInfo).forEach(key => {
          this.clientSpesc.set(key, response.customerInfo[key]);
        });
      }
      this.processingModal.show();
    });
  }

  changePage(direction) {
    switch (direction) {
      case 'previous':
        this.currentPage -= 1;
        break;
      default:
        this.currentPage += 1;
        break;
    }
    this.transactionService.currentPage.next(this.currentPage);
  }
}
