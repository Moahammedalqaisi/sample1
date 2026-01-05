import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Expense } from './expense.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExpenseRepository implements IExpenseRepository {
  constructor(
    @InjectRepository(Expense)
    private readonly repo: Repository<Expense>,
  ) {}

  async findAll(skip: number, take: number): Promise<[Expense[], number]> {
    return this.repo.findAndCount({ skip, take });
  }

  async findById(id: string): Promise<Expense | null> {
    const expense = this.repo.findOne({ where: { id } });
    return expense;
  }

  async create(expense: Partial<Expense>): Promise<Expense> {
    const newExpense = this.repo.create(expense);
    return this.repo.save(newExpense);
  }

  async update(id: string, expense: Partial<Expense>): Promise<Expense | null> {
    await this.repo.update(id, expense);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}

export interface IExpenseRepository {
  findAll(skip: number, take: number): Promise<[Expense[], number]>;
  findById(id: string): Promise<Expense | null>;
  create(expense: Partial<Expense>): Promise<Expense>;
  update(id: string, expense: Partial<Expense>): Promise<Expense | null>;
  delete(id: string): Promise<void>;
}
