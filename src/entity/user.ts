import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany } from 'typeorm'
import { Task } from './task'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @Column({
    unique: true
  })
    email: string

  @Column()
    password: string

  @Column({
    nullable: true
  })
    image: string

  @Column({
    default: false
  })
    disabled: boolean

  @OneToMany(() => Task, task => task.user)
    tasks: Task[]

  @CreateDateColumn()
    createdAt: Date

  @UpdateDateColumn()
    updatedAt: Date
}
