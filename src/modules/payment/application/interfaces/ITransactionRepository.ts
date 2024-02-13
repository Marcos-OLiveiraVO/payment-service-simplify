import { Payable } from '../entities/payable';
import { Transaction } from '../entities/transaction';

export abstract class ITransactionRepository {
  abstract createTransaction(data: Transaction): Promise<Transaction>;
  abstract createPayableTransaction(data: Payable): Promise<void>;
}
