import { DataSource } from 'typeorm';
import { Expense } from '../expenses/expense.entity';
import { User } from '../users/user.entity';
import { Claim } from '../claims/claim.entity';
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user1',
  password: 'P@ssw0rd100',
  database: 'nodejssamples',
  entities: [Expense, User, Claim],
  migrations: ['src/migrations/*.ts'], // Path to your migrations folder
  synchronize: false, // Keep false for migrations
  logging: true, // Enables SQL logging for debugging (remove in prod)
});
