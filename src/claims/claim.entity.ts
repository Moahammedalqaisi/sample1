import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  //JoinColumn,
} from 'typeorm';
import { Expense } from '../expenses/expense.entity';

@Entity()
export class Claim {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Expense, (expense: Expense) => expense.claim)
  expenses: Expense[];

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  amount: number;
}
