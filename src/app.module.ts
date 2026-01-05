import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseModule } from './expenses/expenses.module';
import { Expense } from './expenses/expense.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user1',
      password: 'P@ssw0rd100',
      database: 'nodejssamples',
      entities: [Expense],
      synchronize: false,
      logging: false, // Enables SQL logging for debugging (remove in prod)
    }),
    ExpenseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
