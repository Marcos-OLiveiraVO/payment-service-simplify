import { Transaction } from 'src/modules/payment/application/entities/transaction';

export class TransactionViewModel {
  static toHttp(entity: Transaction) {
    return {
      id: entity.id,
      description: entity.description,
      paymentMethod: entity.paymentMethod,
      cardOwnerName: entity.cardOwner,
      expirationDate: entity.expirationDate,
      cvv: entity.cvv,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
