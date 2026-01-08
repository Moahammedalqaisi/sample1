import { PagedResultDto } from 'src/fwk/page.result';
import { CreateClaimDto } from './dto/create-claim.dto';
import { ClaimDto } from './dto/claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';
import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import type { IClaimRepository } from './claim.repository.interface';
import { IClaimService } from './claims.service.interface';
import { Repository } from 'typeorm';
import { Expense } from '../expenses/expense.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable({ scope: Scope.TRANSIENT })
export class ClaimService implements IClaimService {
  constructor(
    @Inject('IClaimRepository')
    private readonly claimRepo: IClaimRepository,
    @InjectRepository(Expense)
    private readonly expenseRepo: Repository<Expense>,
  ) {}

  private calculateAmount(expenses: Expense[]): number {
    return expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  }

  async getPaged(
    skip: number,
    take: number,
  ): Promise<PagedResultDto<ClaimDto>> {
    const [claims, totalCount] = await this.claimRepo.findAll(skip, take);
    return {
      items: claims.map((c) => ({
        id: c.id,
        title: c.title,
        expenses: c.expenses || [],
        amount: this.calculateAmount(c.expenses || []),
      })),
      totalCount,
    };
  }

  async getById(id: string): Promise<ClaimDto | null> {
    const claim = await this.claimRepo.findById(id);
    if (claim === null)
      throw new NotFoundException(`Claim with id [${id}] not found`);
    return claim
      ? {
          id: claim.id,
          title: claim.title,
          expenses: claim.expenses || [],
          amount: this.calculateAmount(claim.expenses || []),
        }
      : null;
  }

  async create(dto: CreateClaimDto): Promise<ClaimDto> {
    const claim = await this.claimRepo.create({
      title: dto.title,
    });

    // If expense IDs are provided, associate them with the claim
    if (dto.expenseIds && dto.expenseIds.length > 0) {
      await this.expenseRepo.update(dto.expenseIds, { claimId: claim.id });
    }

    // Reload the claim with expenses
    const updatedClaim = await this.claimRepo.findById(claim.id);
    if (updatedClaim === null) throw new NotFoundException('Claim not found');
    return {
      id: updatedClaim?.id,
      title: updatedClaim?.title,
      expenses: updatedClaim?.expenses || [],
      amount: this.calculateAmount(updatedClaim?.expenses || []),
    };
  }

  async update(id: string, dto: UpdateClaimDto): Promise<ClaimDto | null> {
    // Update basic claim info
    await this.claimRepo.update(id, { title: dto.title });

    // If expense IDs are provided, update expense associations
    if (dto.expenseIds) {
      // First, remove the claim from all existing expenses
      await this.expenseRepo
        .createQueryBuilder()
        .update(Expense)
        .set({ claimId: id })
        .where('claimId = :claimId', { claimId: id })
        .execute();

      // Then, associate the new expenses
      if (dto.expenseIds.length > 0) {
        await this.expenseRepo.update(dto.expenseIds, { claimId: id });
      }
    }

    const updated = await this.claimRepo.findById(id);
    return updated
      ? {
          id: updated.id,
          title: updated.title,
          expenses: updated.expenses || [],
          amount: this.calculateAmount(updated.expenses || []),
        }
      : null;
  }

  async delete(id: string): Promise<void> {
    // First, remove the claim reference from all associated expenses
    await this.expenseRepo
      .createQueryBuilder()
      .update(Expense)
      .set({ claimId: id })
      .where('claimId = :claimId', { claimId: id })
      .execute();

    await this.claimRepo.delete(id);
  }
}
