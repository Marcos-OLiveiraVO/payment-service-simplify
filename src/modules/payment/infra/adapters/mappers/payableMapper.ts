import { payable as PayableModel, profileClient, transaction } from '@prisma/client';
import { Payable as PayableEntity } from '@payment/application/entities/payable';
import { ProfileClientMapper } from '@profileClient/infra/adapters/mappers/profileClientMapper';
import { TransactionMapper } from './transactionMapper';

export interface PayableToDomainInput extends PayableModel {
  ProfileClient: profileClient;
  Transaction: transaction;
}

export class PayableMapper {
  static toDomain(entity: PayableToDomainInput): PayableEntity {
    return new PayableEntity(
      {
        profileClient: ProfileClientMapper.toDomain(entity.ProfileClient),
        transaction: TransactionMapper.toDomain(entity.Transaction as transaction),
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
      transactionId: entity.transaction as number,
      status: entity.status,
      fee: entity.fee,
      paymentDate: entity.paymentDate,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
