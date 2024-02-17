import { Transaction } from 'src/modules/payment/application/entities/transaction';
import { ITransactionRepository } from 'src/modules/payment/application/interfaces/ITransactionRepository';
import { TransactionMapper } from '../../adapters/mappers/transactionMapper';
import { PrismaService } from 'src/shared/database/prismaService';
import { Injectable } from '@nestjs/common';
import { PayableMapper } from '../../adapters/mappers/payableMapper';
import { Payable } from 'src/modules/payment/application/entities/payable';
import { GetPayable } from 'src/modules/payment/application/use-cases/getPayableUseCase';
import { PayableWithPagination } from 'src/modules/payment/application/interfaces/transactionRequest';

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

  async getPayableInformation(data: GetPayable): Promise<PayableWithPagination> {
    const payables = await this.prisma.payable.findMany({
      where: {
        profileClientId: data.profileClientId,
        status: data.status,
      },
      take: data.limit,
      skip: data.offset,
      include: { Transaction: true, ProfileClient: true },
    });

    const actualPage = data.offset / data.limit + 1;
    const totalPayables = payables.length;
    const totalPages = Math.ceil(totalPayables / data.limit);

    const payablesMapped = payables.map(payables => PayableMapper.toDomain(payables));

    const payableWithPagination = {
      profileClient: payables[0].ProfileClient,
      payables: payablesMapped,
      actualPage,
      totalPages,
      totalPayables,
    };

    return payableWithPagination;
  }
}
