import { pool } from '../db/mysql.js'

export const getCategory = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM categories WHERE id_categ = ?',[req.params.id])
  if (rows.length <= 0) return res.status(404).json({message: "category not found"})
  res.json(rows[0])
}

export const getCategories = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM categories')
  res.json(rows)
}

export const createCategory = async (req, res) => {
  const {categ_name, url_img} = req.body
  const [rows] = await pool.query('INSERT INTO categories(categ_name, url_img) VALUES (?,?)',[categ_name, url_img])
  res.send({
    id_categ: rows.insertId,
    categ_name,
    url_img
  })
}

export const updateCategory = (req, res) => res.send('actualizando categoría')

export const deleteCategory = async (req, res) => {
  const [result] = await pool.query('DELETE FROM categories WHERE id_categ = ?',[req.params.id])
  if (result.affectedRows <= 0) {
    return res.status(404).json({message: "record not found"})
  }
  res.sendStatus(204)
}
