import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseModule } from './expenses/expenses.module';
import { Expense } from './expenses/expense.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { ClaimsModule } from './claims/claims.module';
import { Claim } from './claims/claim.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user1',
      password: 'P@ssw0rd100',
      database: 'nodejssamples',
      entities: [Expense, User, Claim],
      synchronize: false,
      logging: false, // Enables SQL logging for debugging (remove in prod)
    }),
    ExpenseModule,
    UsersModule,
    AuthModule,
    ClaimsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
