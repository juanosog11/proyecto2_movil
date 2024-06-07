import { pool } from '../database/db.js';

export const getUsuarios_acc = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Usuario_Accion');
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: 'Ocurrio algo intente mas tarde',
    });
  }
};
export const getUsuario_acc = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Usuario_Accion WHERE id = ?', [req.params.id]);
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

export const getUsuario_acc_user = async (req, res) => {
  
  const id = req.params.id
  try {
    const [rows] = await pool.query('SELECT * FROM Usuario_Accion WHERE usuario_id = ?', [id]);
    
    if (rows.length <= 0)
      return res.status(404).json({
        message: 'Employee not found',
      });
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: 'Ocurrio algo intente mas tarde',
    });
  }
};

export const createUsuarios_acc = async (req, res) => {
  const { usuario_id, simbolo_empresa, cantidad, precio_compra, fecha_compra } = req.body;
  try {
    const [rows] = await pool.query(
      'INSERT INTO Usuario_Accion (usuario_id, simbolo_empresa, cantidad, precio_compra, fecha_compra) VALUES (?, ?, ?, ?, ?)',
      [usuario_id, simbolo_empresa, cantidad, precio_compra, fecha_compra]
    );
    res.send({
      id: rows.insertId,
      usuario_id,
      simbolo_empresa,
      cantidad,
      precio_compra,
      fecha_compra,
    });
  } catch (error) {
    console.log(error); // Log the error for debugging
    return res.status(500).json({
      message: 'Ocurrio algo intente mas tarde',
    });
  }
};


export const deleteUsuarios_acc = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM Usuario_Accion WHERE id = ?', [req.params.id]);
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

export const updateUsuarios_acc = async (req, res) => {
  const { id } = req.params;
  const { usuario_id, simbolo_empresa, cantidad, precio_compra, fecha_compra } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE Usuario_Accion SET usuario_id = IFNULL(?, usuario_id),simbolo_empresa = IFNULL(?, simbolo_empresa),cantidad = IFNULL(?, cantidad),precio_compra = IFNULL(?, precio_compra),fecha_compra = IFNULL(?, fecha_compra) WHERE id = ?',
      [usuario_id, simbolo_empresa, cantidad, precio_compra, fecha_compra, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: 'Employee not found',
      });

    const [rows] = await pool.query('SELECT * FROM Usuario_Accion WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: 'Ocurrio algo intente mas tarde',
    });
  }
};
