import { ITransactionRepository } from '../interfaces/ITransactionRepository';
import { Payable } from '../entities/payable';
import { Injectable } from '@nestjs/common';
import { CreatePayable } from '../interfaces/transactionRequest';
import { thirdDaysLater } from '@shared/utils/date';

@Injectable()
export class CreatePayableUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(data: CreatePayable): Promise<void> {
    const fee = data.paymentMethod === 'debit_card' ? 3 : 5;
    const paymentDate = data.paymentMethod === 'debit_card' ? new Date() : thirdDaysLater();
    const status = data.paymentMethod === 'debit_card' ? 'paid' : 'waiting_funds';

    const payable = new Payable({
      transaction: data.transaction,
      profileClient: data.profileClientId,
      status,
      paymentDate,
      fee,
    });

    return await this.transactionRepository.createPayableTransaction(payable);
  }
}
