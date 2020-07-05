export interface ClientResponse {
  customerInfo: CustomerInfo;
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
  billingPhone: string;
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
  shippingPhone: string;
  shippingFax: any;
  token: any;
}
