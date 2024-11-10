// eslint-disable-next-line @typescript-eslint/no-require-imports
require('ts-node/register')
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config()

module.exports = {
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  use_env_variable: process.env.NODE_ENV,
  dialect: 'mysql',
  port: 3306
}
