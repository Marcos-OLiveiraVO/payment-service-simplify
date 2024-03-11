import { GetTransactionsUseCase } from '@payment/application/use-cases/getTransactionsUseCase';
import { GetTransactionsDTO } from '../../adapters/dtos/transactionDTO';
import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { TransactionViewModel } from '../viewModels/transactionViewModel';

@Controller('transactions')
export class GetTransactionsController {
  constructor(private getTransactionsUseCase: GetTransactionsUseCase) {}

  @Get('list')
  @HttpCode(200)
  async handle(@Query() data: GetTransactionsDTO) {
    const transaction = await this.getTransactionsUseCase.execute(data);

    const transactionsMapped = {
      transactions: transaction.transactions.map(transaction => TransactionViewModel.toHttp(transaction)),
      currentPage: transaction.currentPage,
      totalPages: transaction.totalPages,
      totalTransactions: transaction.totalTransactions,
    };

    return transactionsMapped;
  }
}
