import {createPool} from "mysql2/promise"
import config from "../config.js";
// import pg from "pg";

export const pool = createPool({
  host: config.dbhost,
  user: config.dbuser,
  password: config.dbpassword,
  port: config.dbport,
  database: config.dbname,
});

// export const pool = new pg.Pool(
//   {
//     connectionString: "postgres://root:QQG8fIGpIhdjNu4hdTfPltUoRxfddPqf@dpg-cpd9265ds78s73e7rjm0-a.oregon-postgres.render.com/dbapp_1958",
//     ssl:true,
    
//   }
// )

