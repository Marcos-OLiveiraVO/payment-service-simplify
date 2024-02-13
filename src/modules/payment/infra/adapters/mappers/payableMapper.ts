import { payable as PayableModel } from '@prisma/client';
import { Payable as PayableEntity } from 'src/modules/payment/application/entities/payable';

export class PayableMapper {
  static toDatabase(entity: PayableEntity): PayableModel {
    return {
      id: entity.id,
      profileClientId: entity.profileClient,
      transactionId: entity.transaction,
      status: entity.status,
      fee: entity.fee,
      paymentDate: entity.paymentDate,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
