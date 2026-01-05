import { Type } from 'class-transformer';
import {
  //IsDate,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { IsDateOrString } from 'src/fwk/validators/date.validator';

export abstract class ExpenseBaseDto {
  @IsString()
  @MaxLength(100)
  title: string;

  @IsDateOrString()
  @Type(() => Date)
  date: Date;

  @IsNumber()
  @Min(0)
  amount: number;

  @IsNumber()
  @Min(0)
  taxPercentage: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}
