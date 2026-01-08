import { Claim } from './claim.entity';

export interface IClaimRepository {
  findAll(skip: number, take: number): Promise<[Claim[], number]>;
  findById(id: string): Promise<Claim | null>;
  create(claim: Partial<Claim>): Promise<Claim>;
  update(id: string, claim: Partial<Claim>): Promise<Claim | null>;
  delete(id: string): Promise<void>;
}
