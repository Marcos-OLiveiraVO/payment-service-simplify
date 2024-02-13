import { Injectable } from '@nestjs/common';
import { Transaction } from '../entities/transaction';
import { ITransactionRepository } from '../interfaces/ITransactionRepository';

export interface CreateTransaction {
  profileClientId: number;
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
    const cardLastFourDigits = data.cardNumber.slice(-4);

    const transaction = new Transaction({
      ...data,
      profileClient: data.profileClientId,
      cardNumber: cardLastFourDigits,
    });

    return await this.transactionRepository.createTransaction(transaction);
  }
}
