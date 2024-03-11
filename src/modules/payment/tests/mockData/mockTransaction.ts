export const transactionMock = {
  profileClientId: 1,
  amount: 100.5,
  description: 'Compra de produtos de tecnologia. Mouse, teclado e headset gamer.',
  paymentMethod: 'credit_card',
  cardNumber: '1234567890123456',
  cardOwner: 'Marcos Henrique da Silva',
  expirationDate: new Date(),
  cvv: '123',
};

export const payableCreditMock = {
  profileClientId: transactionMock.profileClientId,
  paymentMethod: transactionMock.paymentMethod,
  transaction: 1,
}

export const payableDebitMock = {
  profileClientId: transactionMock.profileClientId,
  paymentMethod: 'debit_card',
  transaction: 1,
}