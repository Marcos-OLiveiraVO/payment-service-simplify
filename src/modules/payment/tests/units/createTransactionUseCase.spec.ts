import { TransactionInMemoryRepository } from "../inMemoryRepository/transactionInMemoryRepository";
import { CreateTransactionUseCase } from "@payment/application/use-cases/createTransactionUseCase";
import { CreatePayableUseCase } from "@payment/application/use-cases/createPayableUseCase";
import { transactionMock } from "../mockData/mockTransaction";
import { Transaction } from "@payment/application/entities/transaction";

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
    expect(transaction.cardOwner).toBe(transactionMock.cardOwner);
  });
});
