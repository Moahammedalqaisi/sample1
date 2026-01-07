import { Expense } from './expense.entity';

export interface IExpenseRepository {
  findAll(skip: number, take: number): Promise<[Expense[], number]>;
  findById(id: string): Promise<Expense | null>;
  create(expense: Partial<Expense>): Promise<Expense>;
  update(id: string, expense: Partial<Expense>): Promise<Expense | null>;
  delete(id: string): Promise<void>;
}
