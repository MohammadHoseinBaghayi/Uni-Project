import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export class MulterConfigurations implements MulterOptionsFactory{
  createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
    const maxSize:number=1*1000*1000
    const options:MulterModuleOptions=
      {
        storage:diskStorage({
          destination:'./uploaded-file',
          filename:(req,file,cb)=>{
            const name=file.originalname.split('.')[0]
            const fileExtention=file.originalname.split('.')[1]
            const newFileName=file.originalname.split(".")[0]+'__'+Date.now()+'.'+fileExtention
            file.originalname=newFileName
            cb(null,newFileName)
          }
        }),
        fileFilter:(req,file,cb)=> {
          if (file.originalname.split('.')[1] !== 'PNG' || file.originalname.split('.')[1] !== 'jpg') {
            return cb(new Error(`You must send a PNG or jpg file`),false)
          }

          if (file.size>maxSize)
            return cb(new Error(`Size is not OK`),false,)

          return cb(null,true)


        }
      }
      return options
  }

}