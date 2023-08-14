import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const {
  PORT = '8000',

} = process.env

const DATA_PATH_JSON = path.join(__dirname, '../data.json')

export {
  PORT,
  DATA_PATH_JSON,
}