import { Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../interfaces/ITransactionRepository';
import { GetPayable, PayableWithPagination } from '../interfaces/transactionRequest';

@Injectable()
export class GetPayableUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(data: GetPayable): Promise<PayableWithPagination> {
    return await this.transactionRepository.getPayableInformation(data);
  }
}
