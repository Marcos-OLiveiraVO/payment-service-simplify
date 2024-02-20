import { Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../interfaces/ITransactionRepository';
import { GetTransactions, TransactionsWithPagination } from '../interfaces/transactionRequest';

@Injectable()
export class GetTransactionsUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(data: GetTransactions): Promise<TransactionsWithPagination> {
    return await this.transactionRepository.getTransactions(data);
  }
}
