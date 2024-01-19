import { pool } from '../db/mysql.js'
import moment from 'moment'

export const getPromo = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM promos WHERE id_promo = ?',[req.params.id])
    if (rows.length <= 0) return res.status(404).json({message: "promo not found"})
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong'})
  }
}

export const getPromos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM promos')
    res.json(rows)
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong'})
  }
}

export const createPromo = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong'})
  }
}

export const updatePromo = async (req, res) => {
  try {
    const {id} = req.params
    const {first_date, last_date, url_img, title, sub_title, position, active} = req.body
    // Ajustar el formato de salida de la fecha a YYYY-MM-DD
    const formattedFirstDate = moment(first_date).format('YYYY-MM-DD')
    const formattedLastDate = moment(last_date).format('YYYY-MM-DD')
    // Hacer la actualización
    const [result] = await pool.query('UPDATE promos SET first_date = ?, last_date = ?, url_img = ?, title = ?, sub_title = ?, position = ?, active = ? WHERE id_promo = ?', [formattedFirstDate, formattedLastDate, url_img, title, sub_title, position, active, id])
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Invalid record'})
    const [rows] = await pool.query('SELECT * FROM promos WHERE id_promo = ?', [id])
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong - '+ error })
  }
}

export const deletePromo = async (req, res) => {
  const [result] = await pool.query('DELETE FROM promos WHERE id_promo = ?',[req.params.id])
  if (result.affectedRows <= 0) {
    return res.status(404).json({message: "record not found"})
  }
  res.sendStatus(204)
}
