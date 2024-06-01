import { config } from 'dotenv'

config()

export default {
    port: process.env.PORT || 3001,
    dbuser: process.env.DB_USER || "root",
    dbpassword: process.env.DB_PASSWORD,
    dbhost: process.env.DB_HOST,
    dbport: process.env.DB_PORT,
    dbname: process.env.DB_NAME,
    url:process.env.url,
}