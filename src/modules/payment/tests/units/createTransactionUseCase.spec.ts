import { Transaction } from '../../application/entities/transaction';
import { CreatePayableUseCase } from '../../application/use-cases/createPayableUseCase';
import { CreateTransactionUseCase } from '../../application/use-cases/createTransactionUseCase';
import { TransactionInMemoryRepository } from '../inMemoryRepository/transactionInMemoryRepository';
import { transactionMock } from '../mockData/mockTransaction';

let transactionRepository: TransactionInMemoryRepository;
let createTransactionUseCase: CreateTransactionUseCase;
let createPayableUseCase: CreatePayableUseCase;

describe('Create Transaction UseCase', () => {
  beforeEach(() => {
    transactionRepository = new TransactionInMemoryRepository();
    createPayableUseCase = new CreatePayableUseCase(transactionRepository);
    createTransactionUseCase = new CreateTransactionUseCase(transactionRepository, createPayableUseCase);
  });

  it('should be able to create transaction', async () => {
    const transaction = await createTransactionUseCase.execute(transactionMock);

    expect(transaction).toBeInstanceOf(Transaction);
    expect(transaction.cardOwner).toBe(transactionMock.cardOwner)
  });
});
