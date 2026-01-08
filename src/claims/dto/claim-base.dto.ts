import {
  IsString,
  MaxLength,
  IsArray,
  IsOptional,
  IsUUID,
} from 'class-validator';

export abstract class ClaimBaseDto {
  @IsString()
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  expenseIds?: string[];
}
