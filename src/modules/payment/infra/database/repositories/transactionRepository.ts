import { Transaction } from 'src/modules/payment/application/entities/transaction';
import { ITransactionRepository } from 'src/modules/payment/application/interfaces/ITransactionRepository';
import { TransactionMapper } from '../../adapters/mappers/transactionMapper';
import { PrismaService } from 'src/shared/database/prismaService';
import { Injectable } from '@nestjs/common';
import { PayableMapper } from '../../adapters/mappers/payableMapper';
import { Payable } from 'src/modules/payment/application/entities/payable';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(private prisma: PrismaService) {}

  async createTransaction(data: Transaction): Promise<Transaction> {
    const transaction = await this.prisma.transaction.create({
      data: TransactionMapper.toDatabase(data),
    });

    return TransactionMapper.toDomain(transaction);
  }

  async createPayableTransaction(data: Payable): Promise<void> {
    await this.prisma.payable.create({
      data: PayableMapper.toDatabase(data),
    });
  }
}
