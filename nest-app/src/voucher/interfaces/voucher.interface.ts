export interface Voucher {
  id: string;
  readonly success?: string;
  readonly code?: string;
  readonly name?: string;
  readonly description?: string;
  readonly validityInDays?: string;
  readonly voucherCode?: string;
  readonly voucherBatchId?: string;
  readonly value?: { value: string };
}
