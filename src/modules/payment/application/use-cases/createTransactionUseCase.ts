import { Injectable } from '@nestjs/common';
import { Transaction } from '../entities/transaction';
import { ITransactionRepository } from '../interfaces/ITransactionRepository';
import { calculateFee } from '../service/calculateFee';
import { CreatePayableUseCase } from './createPayableUseCase';

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
  constructor(
    private transactionRepository: ITransactionRepository,
    private createPayableUseCase: CreatePayableUseCase,
  ) {}

  async execute(data: CreateTransaction): Promise<Transaction> {
    const cardLastFourDigits = data.cardNumber.slice(-4);

    const calculateAmount = calculateFee({
      amount: data.amount,
      paymentMethod: data.paymentMethod,
    });

    const transactionEntity = new Transaction({
      ...data,
      paymentMethod: data.paymentMethod,
      cardNumber: cardLastFourDigits,
      amount: calculateAmount,
    });

    const transaction = await this.transactionRepository.createTransaction(transactionEntity);
    await this.createPayableUseCase.execute({
      ...data,
      transaction: transaction.id,
    });

    return transaction;
  }
}
