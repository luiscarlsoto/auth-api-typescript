import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, DeleteDateColumn } from 'typeorm'
import { User } from './user'

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number

  @ManyToOne(() => User)
    user: User

  @Column()
    title: string

  @Column()
    description: string

  @Column({
    default: false
  })
    done: boolean

  @Column({
    default: false
  })
    disabled: boolean

  @DeleteDateColumn()
    deletedAt: Date

  @CreateDateColumn()
    createdAt: Date

  @UpdateDateColumn()
    updatedAt: Date
}
