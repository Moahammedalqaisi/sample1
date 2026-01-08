import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Claim } from './claim.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IClaimRepository } from './claim.repository.interface';

@Injectable()
export class ClaimRepository implements IClaimRepository {
  constructor(
    @InjectRepository(Claim)
    private readonly repo: Repository<Claim>,
  ) {}

  async findAll(skip: number, take: number): Promise<[Claim[], number]> {
    return this.repo.findAndCount({
      skip,
      take,
      relations: ['expenses'],
    });
  }

  async findById(id: string): Promise<Claim | null> {
    const claim = await this.repo.findOne({
      where: { id },
      relations: ['expenses'],
    });
    return claim;
  }

  async create(claim: Partial<Claim>): Promise<Claim> {
    const newClaim = this.repo.create(claim);
    return this.repo.save(newClaim);
  }

  async update(id: string, claim: Partial<Claim>): Promise<Claim | null> {
    await this.repo.update(id, claim);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
