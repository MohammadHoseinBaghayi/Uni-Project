import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ImageEntity } from './image.entity';

@Entity("feedback")
export class FeedbackEntity {
  @PrimaryGeneratedColumn("rowid")
  id:number

  @Column()
  comment:string

  @ManyToOne(()=>ImageEntity,x=>x.obj_feedbacks)
  @JoinColumn({name:"obj_image"})
  obj_image:ImageEntity
}