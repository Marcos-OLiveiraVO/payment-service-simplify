import { Payable } from '@payment/application/entities/payable';
import { TransactionViewModel } from './transactionViewModel';
import { Transaction } from '@payment/application/entities/transaction';

export class PayableViewModel {
  static toHttp(entity: Payable) {
    return {
      id: entity.id,
      status: entity.status,
      paymentDate: entity.paymentDate,
      fee: entity.fee,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      transaction: TransactionViewModel.toHttp(entity.transaction as Transaction),
    };
  }
}
