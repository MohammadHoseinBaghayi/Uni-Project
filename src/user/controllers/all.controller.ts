import {
  Body,
  ConflictException,
  Controller, Get, Param,
  Post, Query,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AllService } from '../services/all.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Response200, ResponseOk } from '../../response.dto';
import { CategoryEntity } from '../entities/category.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from '../dto/create-user.dto';
import { IsNotEmpty } from 'class-validator';
import { RateToPaintDto } from '../dto/rate-to-paint.dto';
import { FeedbackToPaintDto } from '../dto/feedback-to-paint.dto';
import { ImageEntity } from '../entities/image.entity';
import { UserEntity } from '../entities/user.entity';

@ApiTags("All Routes")
@Controller("all")
export class AllController {
  constructor(private allService:AllService) {
  }

  @Post("create/category")
  async createCategory(@Body(ValidationPipe) createCategoryDto:CreateCategoryDto):Promise<Response200>
  {
  return await this.allService.createCategory(createCategoryDto)
  }


  @Post("create/image/:description")
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor("file"))
  async createImage(@UploadedFile("file") file:Express.Multer.File,@Param("description") description:string):Promise<any>
  {
    return await this.allService.createImage(file, description)
  }

  @Get("getall/categories")
  async getAllCategories():Promise<any>
  {
    return await this.allService.getAllCategories()
  }

 
  @Post("create/paint/:category/:description")
  async createPaint(@Body(ValidationPipe) createUserDto:CreateUserDto,@UploadedFile("file") file:Express.Multer.File,@Param("category") category_id:number,@Param("description") description:string):Promise<any>
  {
  return await this.allService.createPaint(createUserDto, file, description, category_id)
  }

  @Post("rate/to/paint")
  async rateToPaint(@Body() rateToPaintDto:RateToPaintDto):Promise<any>
  {
    return await this.allService.rateToPaint(rateToPaintDto)
  }

  @Post("feedback/to/paint")
  async feedbackToPaint(@Body() feedbackToPaintDto:FeedbackToPaintDto):Promise<any>
  {
  return await this.allService.feedbackToPaint(feedbackToPaintDto)
  }

  @Get("user/paints")
  async userPaints(@Query("mobile") mobile:string):Promise<any>
  {
    return await this.allService.userPaints(mobile)
  }

  @Get("get/all/paints")
  async allPaints():Promise<any>
  {
    return await this.allService.allPaints()
  }

  @Get("best/users")
  async highRatePaint():Promise<UserEntity[]>
  {
    return await this.allService.highRatePaint()
  }
}