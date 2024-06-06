import { pool } from "../database/db.js";

const getPaisMoneda = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM Pais_Moneda")

        if (result.length > 0) {

            res.status(200).json(result);

        } else {

            res.status(404).json({ message: "No se encontraron monedas" });

        }

    } catch (error) {
        res.status(500).json({ message: "Error al obtener las monedas fallo try ", error: error.message });
    }
}

const getPaisMonedaId = async (req, res) => {
    try {
        // console.log(req.params.id)

        const [result] = await pool.query("SELECT * FROM Pais_Moneda Where id = ?", [req.params.id])

        if (result.length > 0) {

            res.status(200).json(result);

        } else {

            res.status(404).json({ message: `No se encontraron moneda con id: ` + req.params.id });

        }

    } catch (error) {
        res.status(500).json({ message: "Error al obtener las monedas fallo try ", error: error.message });
    }
}



const postPaisMoneda = async (req, res) => {
    try {

        const { pais_id, Moneda_id } = req.body;

        console.log(pais_id,Moneda_id)

        const [result] =
            await pool.query("INSERT INTO Pais_Moneda (pais_id, Moneda_id) VALUES (?,?)",
                [pais_id, Moneda_id])

        if (result.affectedRows != 0) {

            res.status(200).json(result);

        } else {

            res.status(404).json({ message: "Error al ingresar usuario" });

        }

    } catch (error) {
        res.status(500).json({ message: "Error al obtener las monedas fallo try ", error: error.message });
    }
}

const patchPaisMoneda = async (req, res) => {
    try {
        const { id } = req.params
        const { pais_id, Moneda_id } = req.body

        const [result] =
            await pool.query("UPDATE INTO Pais_Moneda SET pais_id = IFNULL(?,pais_id), Moneda_id = IFNULL(?,Moneda_id) WHERE id = ? ",
                [pais_id, Moneda_id, id])

        if (result.affectedRows != 0) {

            const [rows] = await pool.query("SELECT * FROM Pais_Moneda Where id = ?", [id])
            res.status(200).json(rows);

        } else {

            res.status(404).json({ message: "No se encontraron monedas" });

        }

    } catch (error) {
        res.status(500).json({ message: "Error al obtener las monedas fallo try ", error: error.message });
    }
}

const DeletePaisMoneda = async (req, res) => {
    try {



        const [result] =
            await pool.query("DELETE FROM Pais_Moneda WHERE id = ?",
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
    getPaisMoneda, getPaisMonedaId, postPaisMoneda, DeletePaisMoneda, patchPaisMoneda
}