import { pool } from '../db/mysql.js'

export const getCategory = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories WHERE id_categ = ?',[req.params.id])
    if (rows.length <= 0) return res.status(404).json({message: "category not found"})
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong'})
  }
}

export const getCategories = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories')
    res.json(rows)
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong'})
  }
}

export const createCategory = async (req, res) => {
  try {
    const {categ_name, url_img} = req.body
    const [rows] = await pool.query('INSERT INTO categories(categ_name, url_img) VALUES (?,?)',[categ_name, url_img])
    res.send({
      id_categ: rows.insertId,
      categ_name,
      url_img
    })
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong'})
  }
}

export const updateCategory = async (req, res) => {
  try {
    const {id} = req.params
    const {categ_name, url_img} = req.body
    const [result] = await pool.query('UPDATE categories SET categ_name = ?, url_img = ? WHERE id_categ = ?', [categ_name, url_img, id])
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Invalid record'})
    const [rows] = await pool.query('SELECT * FROM categories WHERE id_categ = ?', [id])
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong - '+ error })
  }
}

export const deleteCategory = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM categories WHERE id_categ = ?',[req.params.id])
    if (result.affectedRows <= 0) {
      return res.status(404).json({message: "record not found"})
    }
    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong'})
  }
}