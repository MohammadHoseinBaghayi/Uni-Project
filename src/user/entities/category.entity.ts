import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("category")
export class CategoryEntity {
  @PrimaryGeneratedColumn("rowid")
  id:number

  @Column()
  name:string
}