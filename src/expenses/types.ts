import { PagedResultDto } from 'src/fwk/page.result';
import { ExpenseListDto } from './dto/expense-list.dto';

export type ExpenseListResultDto = PagedResultDto<ExpenseListDto>;
