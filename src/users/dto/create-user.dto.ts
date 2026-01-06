import { IsString, MinLength } from 'class-validator';
import { UserBaseDto } from './user-base.dto';

export class CreateUserDto extends UserBaseDto {
  @IsString()
  @MinLength(8)
  password: string;
}
