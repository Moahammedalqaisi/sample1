import { Exclude } from 'class-transformer';
import { UserBaseDto } from './user-base.dto';

export class UserDto extends UserBaseDto {
  id: string;

  @Exclude()
  password: string;

  createdAt: Date;

  updatedAt: Date;
}
