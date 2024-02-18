import { payable as PayableModel, profileClient } from '@prisma/client';
import { Payable as PayableEntity } from 'src/modules/payment/application/entities/payable';
import { ProfileClientMapper } from 'src/modules/profileClient/infra/adapters/mappers/profileClientMapper';

export interface PayableToDomainInput extends PayableModel {
  ProfileClient: profileClient;
}

export class PayableMapper {
  static toDomain(entity: PayableToDomainInput): PayableEntity {
    return new PayableEntity(
      {
        profileClient: ProfileClientMapper.toDomain(entity.ProfileClient),
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
      profileClientId: entity.profileClient as number,
      transactionId: entity.transaction,
      status: entity.status,
      fee: entity.fee,
      paymentDate: entity.paymentDate,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
