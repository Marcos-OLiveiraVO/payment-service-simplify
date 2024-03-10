import { Transaction } from '@payment/application/entities/transaction';
import { ITransactionRepository } from '@payment/application/interfaces/ITransactionRepository';
import { TransactionMapper } from '../../adapters/mappers/transactionMapper';
import { PrismaService } from '@shared/database/prismaService';
import { Injectable } from '@nestjs/common';
import { PayableMapper } from '../../adapters/mappers/payableMapper';
import { Payable } from '@payment/application/entities/payable';
import {
  GetPayable,
  GetTransactions,
  PayableWithPagination,
  TransactionsWithPagination,
} from '@payment/application/interfaces/transactionRequest';
import { paginate, paginationSkipItens } from '@shared/utils/paginate';

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

    const totalPayables = await this.prisma.payable.count({
      where: {
        profileClientId: data.profileClientId,
        status: data.status,
      },
    });

    const skipItems = paginationSkipItens(page, limit);
    const totalPages = paginate(totalPayables, limit);

    const payables = await this.prisma.payable.findMany({
      where: {
        profileClientId: data.profileClientId,
        status: data.status,
      },
      take: limit,
      skip: skipItems,
      include: { Transaction: true, ProfileClient: true },
    });

    const payablesMapped = payables.map(payables => PayableMapper.toDomain(payables));

    const payableWithPagination = {
      payables: payablesMapped,
      currentPage: page,
      totalPages,
      totalPayables,
    };

    return payableWithPagination;
  }

  async getTransactions(data: GetTransactions): Promise<TransactionsWithPagination> {
    const page = data.page ?? 1;
    const limit = data.limit ?? 10;

    const totalTransactions = await this.prisma.transaction.count();

    const skipItems = paginationSkipItens(page, limit);
    const totalPages = paginate(totalTransactions, limit);

    const transactions = await this.prisma.transaction.findMany({
      take: limit,
      skip: skipItems,
    });

    const transactionsMapped = transactions.map(transaction => TransactionMapper.toDomain(transaction));

    const transactionsWithPagination = {
      transactions: transactionsMapped,
      currentPage: page,
      totalPages,
      totalTransactions,
    };

    return transactionsWithPagination;
  }
}
