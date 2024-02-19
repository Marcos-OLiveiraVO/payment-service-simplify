import { Transaction } from 'src/modules/payment/application/entities/transaction';
import { ITransactionRepository } from 'src/modules/payment/application/interfaces/ITransactionRepository';
import { TransactionMapper } from '../../adapters/mappers/transactionMapper';
import { PrismaService } from 'src/shared/database/prismaService';
import { Injectable } from '@nestjs/common';
import { PayableMapper } from '../../adapters/mappers/payableMapper';
import { Payable } from 'src/modules/payment/application/entities/payable';
import { GetPayable } from 'src/modules/payment/application/use-cases/getPayableUseCase';
import { PayableWithPagination } from 'src/modules/payment/application/interfaces/transactionRequest';
import { paginate, paginationSkipItens } from 'src/shared/utils/paginate';

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
    const page = data.page ?? 1;
    const limit = data.limit ?? 10;

    const skipItems = paginationSkipItens(page, limit);

    const payables = await this.prisma.payable.findMany({
      where: {
        profileClientId: data.profileClientId,
        status: data.status,
      },
      take: limit,
      skip: skipItems,
      include: { Transaction: true, ProfileClient: true },
    });

    const totalPayables = payables.length;
    const totalPages = paginate(totalPayables, limit);

    const payablesMapped = payables.map(payables => PayableMapper.toDomain(payables));

    const payableWithPagination = {
      payables: payablesMapped,
      currentPage: page,
      totalPages,
      totalPayables,
    };

    return payableWithPagination;
  }
}
