import type { AuditedEntityDto } from '@abp/ng.core';

export interface CreateUpdateLendingDto {
  startDate?: string;
  endDate?: string;
  bookId?: string;
  userId?: string;
  userName?: string;
  lenderId?: string;
  lenderName?: string;
  isDelivered?: boolean;
}

export interface LendingDto extends AuditedEntityDto<string> {
  userId?: string;
  userName?: string;
  lenderId?: string;
  lenderName?: string;
  bookId?: string;
  bookName?: string;
  startDate?: string;
  endDate?: string;
  isDelivered: boolean;
}
