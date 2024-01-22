import { Transaction } from '../entities/transaction';

export abstract class ITransactionRepository {
  abstract createTransaction(data: Transaction): Promise<Transaction>;
}
