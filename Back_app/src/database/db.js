import {createPool} from "mysql2/promise"

export const pool = createPool({
    host:"localhost",
    user: "root",
    password: "3766249oP",
    port:3306,
    database: "app",
})

