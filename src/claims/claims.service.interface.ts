import { PagedResultDto } from 'src/fwk/page.result';
import { CreateClaimDto } from './dto/create-claim.dto';
import { ClaimDto } from './dto/claim.dto';
import { UpdateClaimDto } from './dto/update-claim.dto';

export interface IClaimService {
  getPaged(skip: number, take: number): Promise<PagedResultDto<ClaimDto>>;
  getById(id: string): Promise<ClaimDto | null>;
  create(dto: CreateClaimDto): Promise<ClaimDto>;
  update(id: string, dto: UpdateClaimDto): Promise<ClaimDto | null>;
  delete(id: string): Promise<void>;
}
