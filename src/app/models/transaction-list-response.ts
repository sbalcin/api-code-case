export interface TransactionListResponse {
  per_page: number;
  current_page: number;
  next_page_url: string;
  prev_page_url: any;
  from: number;
  to: number;
  data: Daum[];
}

export interface Daum {
  customerInfo: CustomerInfo;
  updated_at: string;
  created_at: string;
  fx: Fx;
  acquirer: Acquirer;
  transaction: Transaction;
  refundable?: boolean;
  merchant: Merchant3;
  ipn?: Ipn;
}

export interface CustomerInfo {
  number?: string;
  email: string;
  billingFirstName: string;
  billingLastName: string;
}

export interface Fx {
  merchant: Merchant;
}

export interface Merchant {
  originalAmount: number;
  originalCurrency: string;
  convertedAmount: number;
  convertedCurrency: string;
}

export interface Acquirer {
  id: number;
  name: string;
  code: string;
  type: string;
}

export interface Transaction {
  merchant: Merchant2;
}

export interface Merchant2 {
  referenceNo: string;
  status: string;
  customData?: string;
  type: string;
  operation: string;
  created_at: string;
  message: string;
  transactionId: string;
}

export interface Merchant3 {
  id: number;
  name: string;
  allowPartialRefund: boolean;
  allowPartialCapture: boolean;
}

export interface Ipn {
  sent: boolean;
  merchant: Merchant4;
}

export interface Merchant4 {
  transactionId: string;
  referenceNo: string;
  amount: number;
  currency: string;
  date: number;
  code: any;
  message: string;
  operation: string;
  type: string;
  status: string;
  customData: any;
  chainId: string;
  paymentType: string;
  token: string;
  convertedAmount: number;
  convertedCurrency: string;
  IPNUrl: string;
  ipnType: string;
  authTransactionId?: string;
}
