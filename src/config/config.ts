import 'dotenv/config'

export const config = {
  DB_PORT: process.env.DB_PORT || 3000,
  API_KEY: process.env.API_KEY || '',
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USERNAME,
  DB_NAME: process.env.DB_NAME
}
