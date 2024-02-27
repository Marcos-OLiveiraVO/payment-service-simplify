import { paginate, paginationSkipItens } from '@shared/utils/paginate';
import { Payable } from '../../application/entities/payable';
import { Transaction } from '../../application/entities/transaction';
import { ITransactionRepository } from '../../application/interfaces/ITransactionRepository';
import {
  GetPayable,
  PayableWithPagination,
  GetTransactions,
  TransactionsWithPagination,
} from '../../application/interfaces/transactionRequest';

export class InMemoryTransactionRepository implements ITransactionRepository {
  private transaction = new Map<number, Transaction>();
  private payable = new Map<number, Payable>();

  async createTransaction(data: Transaction): Promise<Transaction> {
    const id = this.transaction.size + 1;

    this.transaction.set(id, data);
    return this.transaction.get(id);
  }

  async createPayableTransaction(data: Payable): Promise<void> {
    const id = this.payable.size + 1;

    this.payable.set(id, data);
  }

  async getPayableInformation(data: GetPayable): Promise<PayableWithPagination> {
    const page = data.page ?? 1;
    const limit = data.limit ?? 10;

    const totalPayables = Array.from(this.payable.values()).filter(
      payable => payable.profileClient === data.profileClientId && payable.status,
    );

    const skipItems = paginationSkipItens(page, limit);
    const totalPages = paginate(totalPayables.length, limit);

    const payables = totalPayables.slice(totalPayables.length, skipItems + data.limit);

    const payableWithPagination = {
      payables: payables,
      currentPage: page,
      totalPages,
      totalPayables: totalPayables.length,
    };

    return payableWithPagination;
  }

  async getTransactions(data: GetTransactions): Promise<TransactionsWithPagination> {
    const page = data.page ?? 1;
    const limit = data.limit ?? 10;

    const totalTransactions = Array.from(this.transaction.values());

    const skipItems = paginationSkipItens(page, limit);
    const totalPages = paginate(totalTransactions.length, limit);

    const transactions = totalTransactions.slice(totalTransactions.length, skipItems + data.limit);

    const transactionsWithPagination = {
      transactions: transactions,
      currentPage: page,
      totalPages,
      totalTransactions: totalTransactions.length,
    };

    return transactionsWithPagination;
  }
}
