import { payable as PayableModel } from '@prisma/client';
import { Payable as PayableEntity } from 'src/modules/payment/application/entities/payable';

export class PayableMapper {
  static toDomain(entity: PayableModel): PayableEntity {
    return new PayableEntity(
      {
        profileClient: entity.profileClientId,
        transaction: entity.transactionId,
        paymentDate: entity.paymentDate,
        status: entity.status,
        fee: entity.fee,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
      entity.id,
    );
  }
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
