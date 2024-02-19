import { Payable } from '../entities/payable';
import { Transaction } from '../entities/transaction';
import { GetPayable, PayableWithPagination } from './transactionRequest';

export abstract class ITransactionRepository {
  abstract createTransaction(data: Transaction): Promise<Transaction>;
  abstract createPayableTransaction(data: Payable): Promise<void>;
  abstract getPayableInformation(data: GetPayable): Promise<PayableWithPagination>;
}
