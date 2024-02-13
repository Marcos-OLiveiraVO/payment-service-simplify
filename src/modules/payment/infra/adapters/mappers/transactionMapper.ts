import { transaction as transactionModel } from '@prisma/client';
import { Transaction as transactionEntity } from 'src/modules/payment/application/entities/transaction';

export interface TransactionMapperToDatabaseOutput extends transactionModel {}

export class TransactionMapper {
  static toDomain(entity: transactionModel): transactionEntity {
    return new transactionEntity(
      {
        profileClient: entity.profileClientId,
        amount: entity.amount,
        description: entity.description,
        paymentMethod: entity.paymentMethod,
        cardNumber: entity.cardNumber,
        cardOwner: entity.cardOwner,
        expirationDate: entity.expirationDate,
        cvv: entity.cvv,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
      entity.id,
    );
  }
  static toDatabase(entity: transactionEntity): transactionModel {
    return {
      id: entity.id,
      profileClientId: entity.profileClient,
      amount: entity.amount,
      description: entity.description,
      paymentMethod: entity.paymentMethod,
      cardNumber: entity.cardNumber,
      cardOwner: entity.cardOwner,
      expirationDate: entity.expirationDate,
      cvv: entity.cvv,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
