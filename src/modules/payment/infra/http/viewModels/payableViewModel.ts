import { Payable } from 'src/modules/payment/application/entities/payable';

export class PayableViewModel {
  static toHttp(entity: Payable) {
    return {
      id: entity.id,
      transaction: entity.transaction,
      status: entity.status,
      paymentDate: entity.paymentDate,
      fee: entity.fee,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
