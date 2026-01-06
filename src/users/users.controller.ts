import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  Inject,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import type { IUserService } from './user.service';
import { plainToClass } from 'class-transformer';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Returns all users',
    type: [UserDto],
  })
  async getAll(): Promise<UserDto[]> {
    const users = await this.userService.findAll();
    return users.map((user) =>
      plainToClass(UserDto, user, { excludeExtraneousValues: false }),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'Returns the user', type: UserDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getById(@Param('id') id: string): Promise<UserDto> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return plainToClass(UserDto, user, { excludeExtraneousValues: false });
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() dto: CreateUserDto): Promise<UserDto> {
    const user = await this.userService.create(dto);
    return plainToClass(UserDto, user, { excludeExtraneousValues: false });
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: UserDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserDto> {
    const user = await this.userService.update(id, dto);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return plainToClass(UserDto, user, { excludeExtraneousValues: false });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async delete(@Param('id') id: string): Promise<void> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userService.delete(id);
  }
}
