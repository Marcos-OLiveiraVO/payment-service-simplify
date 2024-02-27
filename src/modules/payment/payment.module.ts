import { Module } from '@nestjs/common';
import { CreateTransactionController } from './infra/http/controllers/createTransactionController';
import { CreateTransactionUseCase } from './application/use-cases/createTransactionUseCase';
import { ITransactionRepository } from './application/interfaces/ITransactionRepository';
import { TransactionRepository } from './infra/database/repositories/transactionRepository';
import { CreatePayableUseCase } from './application/use-cases/createPayableUseCase';
import { GetPayableController } from './infra/http/controllers/getPayableController';
import { GetPayableUseCase } from './application/use-cases/getPayableUseCase';
import { GetTransactionsController } from './infra/http/controllers/getTransactionsController';
import { GetTransactionsUseCase } from './application/use-cases/getTransactionsUseCase';
import { DatabaseModule } from '@shared/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateTransactionUseCase,
    CreatePayableUseCase,
    GetPayableUseCase,
    GetTransactionsUseCase,
    { provide: ITransactionRepository, useClass: TransactionRepository },
  ],

  controllers: [CreateTransactionController, GetPayableController, GetTransactionsController],
})
export class PaymentModule {}
