import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UploadfileModule } from './uploadfile/uploadfile.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, UploadfileModule, AdminModule, UserModule]
})
export class AppModule {}
