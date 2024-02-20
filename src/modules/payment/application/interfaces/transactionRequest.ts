import { Payable } from '../entities/payable';
import { Transaction } from '../entities/transaction';

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

export interface BasePagination {
  limit?: number;
  page?: number;
}

export interface GetPayable extends BasePagination {
  profileClientId: number;
  status: string;
}

export interface GetTransactions extends BasePagination {}

export interface TransactionsWithPagination {
  transactions: Transaction[];
  currentPage: number;
  totalPages: number;
  totalTransactions: number;
}
