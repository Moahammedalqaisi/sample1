import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Claim } from '../claims/claim.entity';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  taxPercentage: number;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @ManyToOne(() => Claim, (claim) => claim.expenses, { nullable: true })
  claim?: Claim;

  @Column({ nullable: true })
  claimId?: string;
}
