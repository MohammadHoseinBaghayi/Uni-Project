import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

export class PostgresConfiguration implements TypeOrmOptionsFactory{
  createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const options:TypeOrmModuleOptions=
      {
        type:"postgres",
        username:"postgres",
        password:"11538832",
        host:"localhost",
        port:5433,
        database:"mohammad-hosein-baghayi",
        autoLoadEntities:true,
        synchronize:true
      }
      return options
  }

}