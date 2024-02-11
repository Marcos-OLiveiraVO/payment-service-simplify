import { Module } from '@nestjs/common';
import { CreateTransactionController } from './infra/http/controllers/createTransactionController';
import { CreateTransactionUseCase } from './application/use-cases/createTransactionUseCase';
import { DatabaseModule } from 'src/shared/database/database.module';
import { ITransactionRepository } from './application/interfaces/ITransactionRepository';
import { TransactionRepository } from './infra/database/repositories/transactionRepository';

@Module({
  imports: [DatabaseModule],
  providers: [CreateTransactionUseCase, { provide: ITransactionRepository, useClass: TransactionRepository }],
  controllers: [CreateTransactionController],
})
export class PaymentModule {}
