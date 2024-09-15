import { transaction as transactionModel } from '@prisma/client';
import { Transaction as transactionEntity } from '@payment/application/entities/transaction';

export interface TransactionMapperToDatabaseOutput extends transactionModel {}

export class TransactionMapper {
  static toDomain(entity: transactionModel): transactionEntity {
    return new transactionEntity(
      {
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
