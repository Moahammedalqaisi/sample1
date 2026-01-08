import { ExpenseDto } from '../../expenses/dto/expense.dto';

export class ClaimDto {
  id: string;
  title: string;
  expenses: ExpenseDto[];
  amount: number;
}
