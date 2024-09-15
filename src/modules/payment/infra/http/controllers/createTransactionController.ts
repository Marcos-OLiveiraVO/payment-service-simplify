import { CreateTransactionUseCase } from '@payment/application/use-cases/createTransactionUseCase';
import { CreateTransactionDTO } from '../../adapters/dtos/transactionDTO';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { TransactionViewModel } from '../viewModels/transactionViewModel';

@Controller('transaction')
export class CreateTransactionController {
  constructor(private createTransactionUseCase: CreateTransactionUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() data: CreateTransactionDTO): Promise<TransactionViewModel> {
    const transaction = await this.createTransactionUseCase.execute(data);

    return TransactionViewModel.toHttp(transaction);
  }
}
