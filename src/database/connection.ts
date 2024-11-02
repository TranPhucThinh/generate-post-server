import { Sequelize } from 'sequelize-typescript'

import { config } from '@/config/config'
import Post from './models/Post'
import Domain from './models/Domain'

const sequelize = new Sequelize(config.DB_NAME || '', config.DB_USER || '', '', {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false
})

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true })
    console.log('Database synchronized successfully!')
  } catch (error) {
    console.error('Error synchronizing database:', error)
  }
}

export const connection = async () => {
  try {
    // await syncDatabase()

    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

sequelize.addModels([Post, Domain])

export default sequelize
