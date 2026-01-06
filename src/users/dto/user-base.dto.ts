import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export abstract class UserBaseDto {
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsString()
  @MaxLength(50)
  @MinLength(3)
  username: string;

  @IsString()
  @MaxLength(50)
  firstName: string;

  @IsString()
  @MaxLength(50)
  lastName: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
