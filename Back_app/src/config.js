import { config } from 'dotenv'

config()

export default {
    port: process.env.PORT || 3000,
    dbuser: process.env.DB_USER || "root",
    dbpassword: process.env.DB_PASSWORD,
    dbhost: process.env.DB_HOST || "localhost",
    dbport: process.env.DB_PORT || "3306",
    dbname: process.env.DB_NAME || "app",
}