import { getConnection } from "../database/database.js"

const getPersoanjes = async (req,res) => {
    const connection = await getConnection()
    const result = await connection.query('SELECT * FROM personajes');
    res.json(result[0])
}

const getNaves = (req, res) => {
    res.send('hola esto son los naves')
}

export const personajesController = {
    getPersoanjes,
    getNaves
}