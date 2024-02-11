import { Transaction } from 'src/modules/payment/application/entities/transaction';

export class TransactionViewModel {
  static toHttp(entity: Transaction) {
    return {
      id: entity.id,
      amount: entity.amount,
      description: entity.description,
      paymentMethod: entity.paymentMethod,
      cardOwnerName: entity.cardOwner,
      cardNumber: entity.cardNumber,
      expirationDate: entity.expirationDate,
      cvv: entity.cvv,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
