import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/user'
import * as dotenv from 'dotenv'
dotenv.config()

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.PORT ?? 3306),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User],
  migrationsTableName: 'migrations',
  migrations: [],
  subscribers: []
})
