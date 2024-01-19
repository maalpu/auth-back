import { pool } from '../db/mysql.js'

export const getPromo = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM promos WHERE id_promo = ?',[req.params.id])
  if (rows.length <= 0) return res.status(404).json({message: "promo not found"})
  res.json(rows[0])
}

export const getPromos = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM promos')
  res.json(rows)
}

export const createPromo = async (req, res) => {
  const {first_date, last_date, url_img, title, sub_title, position, active} = req.body
  const [rows] = await pool.query('INSERT INTO promos(first_date, last_date, url_img, title, sub_title, position, active) VALUES (?,?,?,?,?,?,?)',[first_date, last_date, url_img, title, sub_title, position, active])
  res.send({
    id_promo: rows.insertId,
    first_date,
    last_date,
    url_img,
    title,
    sub_title,
    position,
    active
  })
}

export const updatePromo = (req, res) => res.send('actualizando promoción')

export const deletePromo = async (req, res) => {
  const [result] = await pool.query('DELETE FROM promos WHERE id_promo = ?',[req.params.id])
  if (result.affectedRows <= 0) {
    return res.status(404).json({message: "record not found"})
  }
  res.sendStatus(204)
}
