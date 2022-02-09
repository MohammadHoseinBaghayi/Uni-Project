import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn, OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ImageEntity } from './image.entity';

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn("rowid")
  id:number

  @Column()
  username:string

  @Column()
  name:string

  @Column()
  family:string

  @Column()
  age:number

  @Column()
  birthdate:string

  @Column()
  phone:string

  @Column()
  address:string

  @CreateDateColumn()
  createdAt:Date

  @UpdateDateColumn()
  updatedAt:Date

  @Column({default:false})
  blocked:boolean

  @OneToMany(()=>ImageEntity,x=>x.obj_user)
  @JoinColumn({name:"obj_images"})
  obj_images:ImageEntity[]
}