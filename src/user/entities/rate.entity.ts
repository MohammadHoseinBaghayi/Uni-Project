import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ImageEntity } from './image.entity';

@Entity("rate")
export class RateEntity {
  @PrimaryGeneratedColumn("rowid")
  id:number

  @Column()
  rate:number

  @ManyToOne(()=>ImageEntity,x=>x.obj_rates)
  @JoinColumn({name:"obj_image"})
  obj_image:ImageEntity
}