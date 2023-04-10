import {createPool} from 'mysql2/promise'

import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  //DB_PORT, //include this one when using Railway, otherwise comment it out
} from './config.js'

export const pool = createPool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  database: DB_NAME,
  //port: DB_PORT //include this one when using Railway, otherwise comment it out
})