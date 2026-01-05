import { Module } from '@nestjs/common';
import { ExpenseService } from './expenses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './expense.entity';
import { ExpenseRepository } from './expenses.repo';
import { ExpenseController } from './expenses.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Expense])],
  controllers: [ExpenseController],
  providers: [
    {
      provide: 'IExpenseRepository',
      useClass: ExpenseRepository,
    },
    {
      provide: 'IExpenseService',
      useClass: ExpenseService,
    },
  ],
  exports: ['IExpenseService'],
})
export class ExpenseModule {}
