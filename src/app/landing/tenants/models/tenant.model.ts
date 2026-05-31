export type Tenant = {
  id: string;
  name: string;
  status: string;
  ownerFirebaseUid: string;
  createdAt: string;
  settings?: TenantSettings;
}

export type TenantSettings = {
  financialSettings: FinancialSettings;
  customerSettings: CustomerSettings;
  paymentSettings: PaymentSettings;
}

export type FinancialSettings = {
  currency: string;
  defaultTipPercent: number;
  taxPercent: number;
  pricesIncludeTax: boolean;
}

export type CustomerSettings = {
  waitingTimeWarningMinutes: number;
  waitingTimeCriticalMinutes: number;
  allowCloseWithUnpaidTabs: boolean;
  qrSessionTimeoutHours: number;
}

export type PaymentSettings = {
  enabledMethods: string[];
}