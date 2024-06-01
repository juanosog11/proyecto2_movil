import { pool } from '../database/db.js';

export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Usuario');
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: 'Ocurrio algo intente mas tarde',
    });
  }
};
export const getUsuario = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Usuario WHERE id = ?', [req.params.id]);
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

export const createUsuarios = async (req, res) => {
  try {
    const { nombre, pais_id, saldo, correo, contraseña, imagen } = req.body;
    const [rows] = await pool.query('INSERT INTO Usuario(nombre, pais_id, saldo, correo, contraseña, imagen)', [
      nombre,
      pais_id,
      saldo,
      correo,
      contraseña,
      imagen,
    ]);
    res.send({
      id: rows.insertId,
      nombre,
      pais_id,
      saldo,
      correo,
      contraseña,
      imagen,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Ocurrio algo intente mas tarde',
    });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Usuario WHERE id = ?', [req.params.id]);
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

export const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, pais_id, saldo, correo, contraseña, imagen } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE Usuario SET nombre = IFNULL(?, nombre),pais_id = IFNULL(?, pais_id),saldo = IFNULL(?, saldo),correo = IFNULL(?, correo),contraseña = IFNULL(?, contraseña),imagen = (?, imagen) WHERE id = ?',
      [nombre, pais_id, saldo, correo, contraseña, imagen, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: 'Employee not found',
      });

    const [rows] = await pool.query('SELECT * FROM Usuario WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: 'Ocurrio algo intente mas tarde',
    });
  }
};
