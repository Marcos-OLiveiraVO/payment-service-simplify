import { Transaction } from '../../application/entities/transaction';
import { CreatePayableUseCase } from '../../application/use-cases/createPayableUseCase';
import { CreateTransactionUseCase } from '../../application/use-cases/createTransactionUseCase';
import { InMemoryTransactionRepository } from '../inMemoryRepository/InMemoryTransactionRepository';

let createTransaction: CreateTransactionUseCase;
let createPayable: CreatePayableUseCase;
let InMemoryRepository: InMemoryTransactionRepository;

describe('Create Transaction', () => {
  beforeEach(() => {
    InMemoryRepository = new InMemoryTransactionRepository();
    createPayable = new CreatePayableUseCase(InMemoryRepository);
    createTransaction = new CreateTransactionUseCase(InMemoryRepository, createPayable);
  });

  it('should be able to create a transaction', async () => {
    const transaction = await createTransaction.execute({
      profileClientId: 1,
      amount: 100.5,
      description: 'Compra de produtos de tecnologia. Mouse, teclado e headset gamer.',
      paymentMethod: 'credit_card',
      cardNumber: '1234567890123456',
      cardOwner: 'Marcos Henrique da Silva',
      expirationDate: new Date(),
      cvv: '123',
    });

    expect(transaction).toBeInstanceOf(Transaction);
  });
});
