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
        console.log(req.body)
        const {nombre,simbolo} = req.body

        const [result] = 
        await pool.query("INSERT INTO moneda (nombre, simbolo) VALUES (?,?)",
        [nombre,simbolo])
        console.log(result)

        if (result.affectedRows != 0) {

            // res.status(200).json(result);
            // res.send({
            //     id: result.insertId,
            //     nombre,
            //     simbolo,
            // });
            res.status(200).send({
                id: result.insertId,
                nombre,
                simbolo,
            })

        } else {

            res.status(404).json({ message: "Error al ingresar usuario" });

        }

    } catch (error) {
        res.status(500).json({ message: "Error al obtener las monedas fallo try ", error: error.message });
    }
}

const patchMonedas = async (req, res) => {
    try {
        const {id} = req.params
        const { nombre, simbolo } = req.body

        const [result] =
            await pool.query("UPDATE INTO moneda SET nombre = IFNULL(?,nombre), simbolo = IFNULL(?,simbolo) WHERE id = ? ",
                [nombre, simbolo,id])

        if (result.affectedRows != 0) {

            const [rows] = await pool.query("SELECT * FROM moneda Where id = ?", [id])
            res.status(200).json(rows);

        } else {

            res.status(404).json({ message: "No se encontraron monedas" });

        }

    } catch (error) {
        res.status(500).json({ message: "Error al obtener las monedas fallo try ", error: error.message });
    }
}

const DeleteMonedas = async (req, res) => {
    try {

        

        const [result] =
            await pool.query("DELETE FROM moneda WHERE id = ?",
                [req.params.id])

        if (result.affectedRows != 0) {

            res.status(200).json("Moneda con el id " + req.params.id + " fue eliminada.");

        } else {

            res.status(404).json({ message: "No se encontraron monedas" });

        }

    } catch (error) {
        res.status(500).json({ message: "Error al obtener las monedas fallo try ", error: error.message });
    }
}






export default {
    getMonedas,getMonedasId,postMonedas,DeleteMonedas,patchMonedas
}