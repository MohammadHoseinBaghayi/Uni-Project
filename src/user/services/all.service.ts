import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException, Param, UploadedFile,
} from '@nestjs/common';
import { Response200, ResponseOk } from '../../response.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from '../repositories/category.repository';
import { CategoryEntity } from '../entities/category.entity';
import { ImageEntity } from '../entities/image.entity';
import { ImageRepository } from '../repositories/image.repository';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { AssignImageToUserDto } from '../dto/assign-image-to-user.dto';
import { AssignCategoryToImageDto } from '../dto/assign-category-to-image.dto';
import { CreateImageDto } from '../dto/create-image.dto';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class AllService {
constructor(@InjectRepository(CategoryRepository) private categoryRepository:CategoryRepository,
            @InjectRepository(ImageRepository) private imageRepository:ImageRepository,
            @InjectRepository(UserRepository) private userRepository:UserRepository,
            private userService:UserService
            ) {
}

  async createCategory(createCategoryDto:CreateCategoryDto):Promise<Response200>
  {
    if (await this.categoryRepository.findOne({where:{name:createCategoryDto.name}}))
      throw new ConflictException(`Category Aleardy Exist`)

    const category=new CategoryEntity()
    category.name=createCategoryDto.name
    const data=await this.categoryRepository.save(category)
    return ResponseOk.getData(data)
  }

  async createImage(file:Express.Multer.File,description:string):Promise<ImageEntity>
  {
    const fileName=file.originalname.split(".")[0]
      const image=new ImageEntity()
    image.name=fileName
    image.description=description
    const data=await this.imageRepository.save(image)
    return data
  }

  async assignImageToUser(assignImageToUserDto:AssignImageToUserDto):Promise<UserEntity>
  {
    const findUser=await this.userRepository.findOne({where:{id:assignImageToUserDto.user_id},relations:["obj_images"]})
    if (!findUser)
      throw new NotFoundException()

    if (findUser.blocked=true)
      throw new BadRequestException(`User is Blocked`)

    const findImage=await this.imageRepository.findOne({where:{id:assignImageToUserDto.image_id},relations:["obj_user"]})
    if (!findImage)
      throw new NotFoundException(`Image Not Found`)

    if (findImage.deleted=true)
      throw new BadRequestException(`Image is deleted`)

    const duplicateRelation=findUser.obj_images.find(x=>x.id=assignImageToUserDto.image_id)
    if (duplicateRelation)
      throw new BadRequestException(`This Image is aleardy for user`)

    const saveUser=await this.userRepository.save(findUser)
    const saveImage=await this.imageRepository.save(findImage)

    return saveUser
  }

  async assignCategoryToImage(assignCategoryToImageDto:AssignCategoryToImageDto):Promise<ImageEntity>
  {
    const findImage=await this.imageRepository.findOne({where:{id:assignCategoryToImageDto.image_id},relations:["obj_category"]})
    if (!findImage)
      throw new NotFoundException(`Image Not Found`)

    if (findImage.deleted==true)
      throw new BadRequestException(`Image Is Deleted`)

    const findCategory=await this.categoryRepository.findOne({where:{id:assignCategoryToImageDto.category_id}})
    if (!findCategory)
      throw new NotFoundException(`Category Not Found`)

    if (findImage.obj_category)
      throw new ConflictException(`Relation Aleardy Exist`)

    findImage.obj_category=findCategory
    const save_image=await this.imageRepository.save(findImage)
    return save_image
  }

  async getAllCategories():Promise<CategoryEntity[]>
  {
    const findCategories=await this.categoryRepository.find()
    return findCategories
  }

  async createPaint(createUserDto:CreateUserDto,file:Express.Multer.File,description:string,category_id:number):Promise<any>
  {
    const createUser=await this.userService.createUser(createUserDto)
    const createImage=await this.createImage(file, description)
    const assignImageToUserDto:AssignImageToUserDto=
      {
        image_id:createImage.id,
        user_id:createUser.id
      }
      const assignImageToUser=await this.assignImageToUser(assignImageToUserDto)
      const assignCategoryToImageDto:AssignCategoryToImageDto=
        {
          category_id:category_id,
          image_id:createImage.id
        }
        const assignCategoryToImage=await this.assignCategoryToImage(assignCategoryToImageDto)
          return assignImageToUser
  }
}
