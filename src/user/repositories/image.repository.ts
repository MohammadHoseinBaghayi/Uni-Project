import { EntityRepository, Repository } from 'typeorm';
import { ImageEntity } from '../entities/image.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(ImageEntity)
export class ImageRepository extends Repository<ImageEntity>{

}