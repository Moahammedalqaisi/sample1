import { DataSource } from 'typeorm';
import { Expense } from '../expenses/expense.entity';
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'user1',
  password: 'P@ssw0rd100',
  database: 'nodejssamples',
  entities: [Expense], // List all your entities here (like EF's DbSet<T>)
  migrations: ['src/migrations/*.ts'], // Path to your migrations folder
  synchronize: false, // Keep false for migrations
  logging: false, // Enables SQL logging for debugging (remove in prod)
});
