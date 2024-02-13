import { Transaction } from 'src/modules/payment/application/entities/transaction';
import { ITransactionRepository } from 'src/modules/payment/application/interfaces/ITransactionRepository';
import { TransactionMapper } from '../../adapters/mappers/transactionMapper';
import { PrismaService } from 'src/shared/database/prismaService';
import { Injectable } from '@nestjs/common';
import { thirdDaysLater } from 'src/shared/utils/date';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(private prisma: PrismaService) {}

  async createTransaction(data: Transaction): Promise<Transaction> {
    const transaction = await this.prisma.transaction.create({
      data: TransactionMapper.toDatabase(data),
    });

    if (data.paymentMethod === 'credit_card') {
      await this.prisma.payable.create({
        data: {
          status: 'waiting funds',
          paymentDate: thirdDaysLater(),
          fee: 5,
        },
      });
    } else if (data.paymentMethod === 'debit_card') {
      await this.prisma.payable.create({
        data: {
          status: 'paid',
          paymentDate: new Date(),
          fee: 3,
        },
      });
    }

    const profileTransactions = await this.prisma.transaction.findMany({
      where: { payeer: 3, payable: { some: { status: 'paid' } } },
    });

    return TransactionMapper.toDomain(transaction);
  }
}
