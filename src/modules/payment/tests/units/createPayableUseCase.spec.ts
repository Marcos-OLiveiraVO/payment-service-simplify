import { CreatePayableUseCase } from '@payment/application/use-cases/createPayableUseCase';
import { TransactionInMemoryRepository } from '../inMemoryRepository/transactionInMemoryRepository';
import { payableCreditMock, payableDebitMock, transactionMock } from '../mockData/mockTransaction';

let createPayableUseCase: CreatePayableUseCase;
let transactionRepository: TransactionInMemoryRepository;

describe('Create Payable UseCase', () => {
  beforeEach(() => {
    transactionRepository = new TransactionInMemoryRepository();
    createPayableUseCase = new CreatePayableUseCase(transactionRepository);
  });

  it('should be able to create a payable with status waiting_funds and credit_card payment', async () => {
    await createPayableUseCase.execute(payableCreditMock);

    const payableInfo = await transactionRepository.getPayableInformation({
      status: 'waiting_funds',
      profileClientId: transactionMock.profileClientId,
    });

    expect(payableInfo.payables.length).toEqual(1);
    expect(payableInfo.payables[0]).toMatchObject({
      status: 'waiting_funds',
      fee: 5,
    })
  });

  it('should be able to create a payable with status paid and debit_card payment', async () => {
    await createPayableUseCase.execute(payableDebitMock);

    const payableInfo = await transactionRepository.getPayableInformation({
      status: 'paid',
      profileClientId: transactionMock.profileClientId,
    });

    expect(payableInfo.payables.length).toEqual(1);
    expect(payableInfo.payables[0]).toMatchObject({
      status: 'paid',
      fee: 3,
    })
  });
});
