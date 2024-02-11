import { Injectable } from '@nestjs/common';
import { Transaction } from '../entities/transaction';
import { ITransactionRepository } from '../interfaces/ITransactionRepository';

export interface CreateTransaction {
  amount: number;
  description: string;
  paymentMethod: string;
  cardNumber: string;
  cardOwner: string;
  expirationDate: Date;
  cvv: string;
}

@Injectable()
export class CreateTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(data: CreateTransaction): Promise<Transaction> {
    const transaction = new Transaction(data);

    return await this.transactionRepository.createTransaction(transaction);
  }
}
