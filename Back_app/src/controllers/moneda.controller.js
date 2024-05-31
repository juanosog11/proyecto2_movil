import { pool } from "../database/db.js";

const getMonedas = async (req,res) => {
    try {
        const [result] = await pool.query("SELECT * FROM moneda")

        if (result.length > 0) {

            res.status(200).json(result);
            
        } else {
            
            res.status(404).json({ message: "No se encontraron monedas" });

        }
        
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las monedas fallo try ", error: error.message });
    }
}

const getMonedasId = async (req, res) => {
    try {
        // console.log(req.params.id)

        const [result] = await pool.query("SELECT * FROM moneda Where id = ?",[req.params.id])

        if (result.length > 0) {

            res.status(200).json(result);

        } else {

            res.status(404).json({ message: `No se encontraron moneda con id: ` + req.params.id });

        }

    } catch (error) {
        res.status(500).json({ message: "Error al obtener las monedas fallo try ", error: error.message });
    }
}



const postMonedas = async (req, res) => {
    try {

        const {nombre,simbolo} = req.body

        const [result] = 
        await pool.query("INSERT INTO moneda (nombre, simbolo) VALUES (?,?)",
        [nombre,simbolo])

        if (result.length > 0) {

            res.status(200).json(result);

        } else {

            res.status(404).json({ message: "Error al ingresar usuario" });

        }

    } catch (error) {
        res.status(500).json({ message: "Error al obtener las monedas fallo try ", error: error.message });
    }
}

const putMonedas = async (req, res) => {
    try {

        const { nombre, simbolo } = req.body

        const [result] =
            await pool.query("INSERT INTO moneda (nombre, simbolo) VALUES (?,?)",
                [nombre, simbolo])

        if (result.length > 0) {

            res.status(200).json(result);

        } else {

            res.status(404).json({ message: "No se encontraron monedas" });

        }

    } catch (error) {
        res.status(500).json({ message: "Error al obtener las monedas fallo try ", error: error.message });
    }
}

const DeleteMonedas = async (req, res) => {
    try {

        const { nombre, simbolo } = req.body

        const [result] =
            await pool.query("INSERT INTO moneda (nombre, simbolo) VALUES (?,?)",
                [nombre, simbolo])

        if (result.length > 0) {

            res.status(200).json(result);

        } else {

            res.status(404).json({ message: "No se encontraron monedas" });

        }

    } catch (error) {
        res.status(500).json({ message: "Error al obtener las monedas fallo try ", error: error.message });
    }
}






export default {
    getMonedas,getMonedasId,postMonedas,
}