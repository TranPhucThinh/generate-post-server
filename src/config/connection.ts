import mysql from 'mysql2/promise'
import { Sequelize } from 'sequelize'
import { config } from './config'
import sequelize from '@/database/connection'

export const db = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  database: config.DB_NAME
})

// export const sequelize = new Sequelize(config.DB_NAME || '', config.DB_USER || '', '', {
//   host: process.env.DB_HOST,
//   dialect: 'mysql',
//   logging: false
// })

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
    await syncDatabase()

    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export const savePostManually = async (titles: string, contents: string, images: string, originalLink: string) => {
  try {
    const [result] = await db.query(
      `INSERT INTO post (title, content, image, original_link, short_url) VALUES (?, ?, ?, ?)`,
      [titles, contents, images, originalLink]
    )
    console.log('Post saved manually:', result)
  } catch (error) {
    console.error('Error saving post manually:', error)
  }
}
