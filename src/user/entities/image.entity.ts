import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { RateEntity } from './rate.entity';
import { FeedbackEntity } from './feedback.entity';
import { CategoryEntity } from './category.entity';

@Entity("image")
export class ImageEntity {
  @PrimaryGeneratedColumn("rowid")
  id:number

  @Column()
  name:string

  @Column()
  description:string

  @CreateDateColumn()
  createdAt:Date

  @UpdateDateColumn()
  updatedAt:Date

  @Column({default:false})
  deleted:boolean

  @ManyToOne(()=>UserEntity,x=>x.obj_images)
  @JoinColumn({name:"obj_user"})
  obj_user:UserEntity

  @OneToMany(()=>RateEntity,x=>x.obj_image)
  @JoinColumn({name:"obj_rates"})
  obj_rates:RateEntity[]

  @OneToMany(()=>FeedbackEntity,x=>x.obj_image)
  @JoinColumn({name:"obj_feedbacks"})
  obj_feedbacks:FeedbackEntity[]

  @OneToOne(()=>CategoryEntity)
  @JoinColumn()
  obj_category:CategoryEntity
}