import { CreateTransactionUseCase } from 'src/modules/payment/application/use-cases/createTransactionUseCase';
import { CreateTransactionDTO } from '../../adapters/dtos/transactionDTO';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Transaction } from 'src/modules/payment/application/entities/transaction';

@Controller('transaction')
export class CreateTransactionController {
  constructor(private createTransactionUseCase: CreateTransactionUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() data: CreateTransactionDTO): Promise<Transaction> {
    console.log(data);
    return this.createTransactionUseCase.execute(data);
  }
}
