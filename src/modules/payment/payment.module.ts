import { Module } from '@nestjs/common';
import { CreateTransactionController } from './infra/http/controllers/createTransactionController';
import { CreateTransactionUseCase } from './application/use-cases/createTransactionUseCase';
import { DatabaseModule } from 'src/shared/database/database.module';
import { ITransactionRepository } from './application/interfaces/ITransactionRepository';
import { TransactionRepository } from './infra/database/repositories/transactionRepository';
import { CreatePayableUseCase } from './application/use-cases/createPayableUseCase';
import { GetPayableController } from './infra/http/controllers/getPayableController';
import { GetPayableUseCase } from './application/use-cases/getPayableUseCase';

@Module({
  imports: [DatabaseModule],
  providers: [
    CreateTransactionUseCase,
    CreatePayableUseCase,
    GetPayableUseCase,
    { provide: ITransactionRepository, useClass: TransactionRepository },
  ],
  controllers: [CreateTransactionController, GetPayableController],
})
export class PaymentModule {}
