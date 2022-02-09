import { EntityRepository, Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(CategoryEntity)
export class CategoryRepository extends Repository<CategoryEntity>{

}