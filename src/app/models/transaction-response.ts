export interface TransactionResponse {
  customerInfo: CustomerInfo;
  fx: Fx;
  transaction: Transaction;
  merchant: Merchant3;
}

export interface CustomerInfo {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  number: string;
  expiryMonth: string;
  expiryYear: string;
  startMonth: any;
  startYear: any;
  issueNumber: any;
  email: string;
  birthday: string;
  gender: any;
  billingTitle: string;
  billingFirstName: string;
  billingLastName: string;
  billingCompany: string;
  billingAddress1: string;
  billingAddress2: any;
  billingCity: string;
  billingPostcode: string;
  billingState: string;
  billingCountry: string;
  billingPhone: any;
  billingFax: any;
  shippingTitle: string;
  shippingFirstName: string;
  shippingLastName: string;
  shippingCompany: string;
  shippingAddress1: string;
  shippingAddress2: any;
  shippingCity: string;
  shippingPostcode: string;
  shippingState: string;
  shippingCountry: string;
  shippingPhone: any;
  shippingFax: any;
  token: any;
}

export interface Fx {
  merchant: Merchant;
}

export interface Merchant {
  originalAmount: number;
  originalCurrency: string;
}

export interface Transaction {
  merchant: Merchant2;
}

export interface Merchant2 {
  referenceNo: string;
  merchantId: number;
  status: string;
  channel: string;
  customData: any;
  chainId: string;
  type: string;
  agentInfoId: number;
  operation: string;
  updated_at: string;
  created_at: string;
  id: number;
  fxTransactionId: number;
  acquirerTransactionId: number;
  code: string;
  message: string;
  transactionId: string;
  agent: Agent;
}

export interface Agent {
  id: number;
  customerIp: string;
  customerUserAgent: string;
  merchantIp: string;
  merchantUserAgent: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
}

export interface Merchant3 {
  name: string;
}
