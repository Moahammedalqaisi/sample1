import { PagedResultDto } from 'src/fwk/page.result';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpenseDto } from './dto/expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import type { IExpenseRepository } from './expenses.repo';

@Injectable({ scope: Scope.TRANSIENT })
export class ExpenseService implements IExpenseService {
  constructor(
    @Inject('IExpenseRepository')
    private readonly expenseRepo: IExpenseRepository,
  ) {}

  async getPaged(
    skip: number,
    take: number,
  ): Promise<PagedResultDto<ExpenseDto>> {
    const [expenses, totalCount] = await this.expenseRepo.findAll(skip, take);
    return {
      items: expenses.map((e) => ({ ...e })),
      totalCount,
    };
  }

  async getById(id: string): Promise<ExpenseDto | null> {
    const expense = await this.expenseRepo.findById(id);
    if (expense === null)
      throw new NotFoundException(`Expense with id [${id}] not found`);
    return expense ? { ...expense } : null;
  }

  async create(dto: CreateExpenseDto): Promise<ExpenseDto> {
    const expense = await this.expenseRepo.create(dto);
    return { ...expense };
  }

  async update(id: string, dto: UpdateExpenseDto): Promise<ExpenseDto | null> {
    const updated = await this.expenseRepo.update(id, dto);
    return updated ? { ...updated } : null;
  }

  async delete(id: string): Promise<void> {
    console.log(`Deleting expense with id: ${id}`);
    await this.expenseRepo.delete(id);
  }
}

export interface IExpenseService {
  getPaged(skip: number, take: number): Promise<PagedResultDto<ExpenseDto>>;
  getById(id: string): Promise<ExpenseDto | null>;
  create(dto: CreateExpenseDto): Promise<ExpenseDto>;
  update(id: string, dto: UpdateExpenseDto): Promise<ExpenseDto | null>;
  delete(id: string): Promise<void>;
}
