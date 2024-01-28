import { pool } from "../db/mysql.js"
import bcrypt from 'bcrypt'

export const getUser = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id_user = ?',[req.params.id])
    if (rows.length <= 0) return res.status(404).json({message: "user not found"})
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong'})
  }
}

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users')
    res.json(rows)
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong'})
  }
}

export const createUser = async (req, res) => {
  try {
    const {first_name, last_name, email, pass, is_admin, active} = req.body
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(pass, saltRounds)
    const [rows] = await pool.query('SELECT email FROM users WHERE email = ?', [email])
    if (rows.length <= 0) {
      const [rows] = await pool.query('INSERT INTO users(first_name, last_name, email, pass, is_admin, active) VALUES (?,?,?,?,?,?)',[first_name, last_name, email, hashedPassword, is_admin, active])
      return res.send({
        id_prod: rows.insertId,
        first_name,
        last_name,
        email,
        hashedPassword,
        is_admin,
        active
      })
    }
    res.status(404).json({message: "The user can\'t be Registed"})
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong'})
  }
}

export const updateUser = async (req, res) => {
  try {
    const {id} = req.params
    const {first_name, last_name, email, is_admin, active} = req.body
    // const saltRounds = 10
    // const hashedPassword = await bcrypt.hash(pass, saltRounds)
    const [result] = await pool.query('UPDATE users SET first_name = IFNULL(?, first_name), last_name = IFNULL(?, last_name), email = IFNULL(?, email), is_admin = IFNULL(?, is_admin), active = IFNULL(?, active) WHERE id_user = ?', [first_name, last_name, email, is_admin, active, id])
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Invalid record'})
    const [rows] = await pool.query('SELECT * FROM users WHERE id_user = ?', [id])
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong - '+ error })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM users WHERE id_user = ?',[req.params.id])
    if (result.affectedRows <= 0) {
      return res.status(404).json({message: "record not found"})
    }
    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong'})
  }
}
