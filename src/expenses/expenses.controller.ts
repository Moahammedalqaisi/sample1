import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  Inject,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseDto } from './dto/expense.dto';
import { PagedResultDto } from 'src/fwk/page.result';
import * as expensesService from './expenses.service';
@Controller('expenses')
export class ExpenseController {
  constructor(
    @Inject('IExpenseService')
    private readonly expenseService: expensesService.IExpenseService,
  ) {}

  @Get()
  async getPaged(
    @Query('skip') skip: number = 0,
    @Query('take') take: number = 10,
  ): Promise<PagedResultDto<ExpenseDto>> {
    return this.expenseService.getPaged(skip, take);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ExpenseDto | null> {
    return this.expenseService.getById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateExpenseDto): Promise<ExpenseDto> {
    return this.expenseService.create(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateExpenseDto,
  ): Promise<ExpenseDto | null> {
    return this.expenseService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.expenseService.delete(id);
  }
}
