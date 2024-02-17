import { Injectable } from '@nestjs/common';
import { Payable } from '../entities/payable';
import { ITransactionRepository } from '../interfaces/ITransactionRepository';
import { PayableWithPagination } from '../interfaces/transactionRequest';

export interface GetPayable {
  profileClientId: number;
  status: string;
  limit: number;
  offset: number;
}

@Injectable()
export class GetPayableUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(data: GetPayable): Promise<PayableWithPagination> {
    return await this.transactionRepository.getPayableInformation(data);
  }
}
