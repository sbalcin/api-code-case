export class TransactionListRequest {
  fromDate: string;
  toDate: string;
  merchantId: number;
  acquirerId: number;
  status: string;
  operation: string;
  paymentMethod: string;
  filterField: string;
  filterValue: string;
  page: number;
  errorCode: string;
}
