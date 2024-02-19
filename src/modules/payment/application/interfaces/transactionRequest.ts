import { Payable } from '../entities/payable';

export interface CreateTransaction {
  profileClientId: number;
  amount: number;
  description: string;
  paymentMethod: string;
  cardNumber: string;
  cardOwner: string;
  expirationDate: Date;
  cvv: string;
}

export interface CreatePayable {
  profileClientId: number;
  transaction: number;
  paymentMethod: string;
}

export interface PayableWithPagination {
  payables: Payable[];
  currentPage: number;
  totalPages: number;
  totalPayables: number;
}

export interface GetPayable {
  profileClientId: number;
  status: string;
  limit: number;
  page: number;
}
