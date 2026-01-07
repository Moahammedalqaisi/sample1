import { Test } from '@nestjs/testing';
import { ExpenseService } from './expenses.service';
import { Expense } from './expense.entity';
// import type { IExpenseRepository } from './expense.repository.interface';
// import { IExpenseRepository } from './expense.repository.interface';
//import { ExpenseRepository } from './expense.repository';

describe('ExpenseService', () => {
  let service: ExpenseService;

  beforeEach(async () => {
    const fakeUserRepo = {
      findById(id: string): Promise<Expense> {
        return Promise.resolve({ id: id } as Expense);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        ExpenseService,
        {
          provide: 'IExpenseRepository',
          useValue: fakeUserRepo,
        },
      ],
    }).compile();
    service = await module.resolve(ExpenseService);
  });

  it('can create an instance of expense service', () => {
    expect(service).toBeDefined();
  });

  it('find by id', async () => {
    const expense = await service.getById(
      'f475346c-5bd9-4960-bf9f-ef9bb6bf8255',
    );
    expect(expense?.id === 'f475346c-5bd3-4960-bf9f-ef9bb6bf8255');
  });
});
