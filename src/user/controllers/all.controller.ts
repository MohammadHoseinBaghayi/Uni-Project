import {
  Body,
  ConflictException,
  Controller, Get, Param,
  Post,
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
}