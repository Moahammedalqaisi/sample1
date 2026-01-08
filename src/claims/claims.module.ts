import { Module } from '@nestjs/common';
import { ClaimService } from './claims.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Claim } from './claim.entity';
import { ClaimRepository } from './claim.repository';
import { ClaimController } from './claims.controller';
import { Expense } from '../expenses/expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Claim, Expense])],
  controllers: [ClaimController],
  providers: [
    {
      provide: 'IClaimRepository',
      useClass: ClaimRepository,
    },
    {
      provide: 'IClaimService',
      useClass: ClaimService,
    },
  ],
  exports: ['IClaimService'],
})
export class ClaimsModule {}
