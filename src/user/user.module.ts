import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigurations } from '../uploadfile/multer.configurations';
import { AllController } from './controllers/all.controller';
import { UserController } from './controllers/user.controller';
import { AllService } from './services/all.service';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { ImageRepository } from './repositories/image.repository';
import { CategoryRepository } from './repositories/category.repository';
import { RateRepository } from './repositories/rate.repository';
import { FeedbackRepository } from './repositories/feedback.repository';

@Module({
  imports:[MulterModule.registerAsync({useClass:MulterConfigurations}),
  TypeOrmModule.forFeature([UserRepository,ImageRepository,CategoryRepository,RateRepository,FeedbackRepository])
  ],
  controllers:[AllController,UserController],
  providers:[AllService,UserService]
})
export class UserModule {}
