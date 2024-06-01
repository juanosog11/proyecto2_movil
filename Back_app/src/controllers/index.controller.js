import { pool } from "../database/db.js";

const ping = async (req, res) => {
    const [result] = await pool.query("SELECT 'pong' as result ")
    res.json(result[0])
}

export {
    ping
}