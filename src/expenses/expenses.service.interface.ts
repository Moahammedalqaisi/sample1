import { PagedResultDto } from 'src/fwk/page.result';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpenseDto } from './dto/expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

export interface IExpenseService {
  getPaged(skip: number, take: number): Promise<PagedResultDto<ExpenseDto>>;
  getById(id: string): Promise<ExpenseDto | null>;
  create(dto: CreateExpenseDto): Promise<ExpenseDto>;
  update(id: string, dto: UpdateExpenseDto): Promise<ExpenseDto | null>;
  delete(id: string): Promise<void>;
}
