// types/payu.d.ts
export interface PayUConfig {
  key: string;
  txnid: string;
  amount: number;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  hash: string;
}

export interface PayUSuccessResponse {
  status: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  mihpayid: string;
  hash: string;
  status: "success" | "failure";
  bank_ref_num?: string;
  error_Message?: string;
  PG_TYPE?: string;
  bank_code?: string;
  cardnum?: string;
  name_on_card?: string;
  unmappedstatus?: string;
}