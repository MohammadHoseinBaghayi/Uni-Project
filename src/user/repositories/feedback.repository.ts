import { EntityRepository, Repository } from 'typeorm';
import { FeedbackEntity } from '../entities/feedback.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(FeedbackEntity)
export class FeedbackRepository extends Repository<FeedbackEntity>{

}