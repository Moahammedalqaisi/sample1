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
import { CreateClaimDto } from './dto/create-claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { ClaimDto } from './dto/claim.dto';
import { PagedResultDto } from 'src/fwk/page.result';
import { IClaimService } from './claims.service.interface';

@Controller('claims')
export class ClaimController {
  constructor(
    @Inject('IClaimService')
    private readonly claimService: IClaimService,
  ) {}

  @Get()
  async getPaged(
    @Query('skip') skip: number = 0,
    @Query('take') take: number = 10,
  ): Promise<PagedResultDto<ClaimDto>> {
    return this.claimService.getPaged(skip, take);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ClaimDto | null> {
    return this.claimService.getById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateClaimDto): Promise<ClaimDto> {
    return this.claimService.create(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateClaimDto,
  ): Promise<ClaimDto | null> {
    return this.claimService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.claimService.delete(id);
  }
}
