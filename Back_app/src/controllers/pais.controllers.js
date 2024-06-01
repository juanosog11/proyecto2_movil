import { pool } from "../database/db.js";

export const getPaises = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Pais');
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: 'Ocurrio algo intente mas tarde',
    });
  }
};
export const getPais = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Pais WHERE id = ?', [req.params.id]);
    if (rows.length <= 0)
      return res.status(404).json({
        message: 'Employee not found',
      });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: 'Ocurrio algo intente mas tarde',
    });
  }
};
export const createPais = async (req, res) => {
  try {
    const { nombre } = req.body;
    const [rows] = await pool.query('INSERT INTO Pais(nombre) VALUES (?)', [nombre]);
    res.send({
      id: rows.insertId,
      nombre,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Ocurrio algo intente mas tarde',
    });
  }
};
export const deletePais = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Pais WHERE id = ?', [req.params.id]);
    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: 'Employee not found',
      });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: 'Ocurrio algo intente mas tarde',
    });
  }
};
export const updatePais = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const [result] = await pool.query('UPDATE Pais SET nombre = IFNULL(?, nombre) WHERE id = ?', [nombre, id]);
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: 'Employee not found',
      });

    const [rows] = await pool.query('SELECT * FROM Pais WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: 'Ocurrio algo intente mas tarde',
    });
  }
};
