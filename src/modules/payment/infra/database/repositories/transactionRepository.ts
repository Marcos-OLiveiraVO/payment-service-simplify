import { Transaction } from 'src/modules/payment/application/entities/transaction';
import { ITransactionRepository } from 'src/modules/payment/application/interfaces/ITransactionRepository';
import { TransactionMapper } from '../../adapters/mappers/transactionMapper';
import { PrismaService } from 'src/shared/database/prismaService';

export class TransactionRepository implements ITransactionRepository {
  constructor(private prisma: PrismaService) {}

  async createTransaction(data: Transaction): Promise<Transaction> {
    const transaction = await this.prisma.transaction.create({
      data: TransactionMapper.toDatabase(data),
    });

    const oneMonthLater = new Date();
    oneMonthLater.setMonth(+1);

    if (data.paymentMethod === 'credit_card') {
      await this.prisma.payable.create({
        data: {
          status: 'waiting funds',
          paymentDate: oneMonthLater,
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

    return TransactionMapper.toDomain(transaction);
  }
}
