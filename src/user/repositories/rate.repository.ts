import { EntityRepository, Repository } from 'typeorm';
import { RateEntity } from '../entities/rate.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(RateEntity)
export class RateRepository extends Repository<RateEntity>{

}