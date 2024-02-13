export interface CreateTransaction {
  profileClientId: number;
  amount: number;
  description: string;
  paymentMethod: string;
  cardNumber: string;
  cardOwner: string;
  expirationDate: Date;
  cvv: string;
}

export interface CreatePayable {
  profileClientId: number;
  transaction: number;
  paymentMethod: string;
}
