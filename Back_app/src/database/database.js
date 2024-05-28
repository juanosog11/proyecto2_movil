import mysql from 'mysql2/promise'
import config from '../config.js'

const connection = mysql.createConnection({
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpassword,
    database: config.dbname,
    port: config.dbport
})

const getConnection = () => {
    return connection
}

export {getConnection}