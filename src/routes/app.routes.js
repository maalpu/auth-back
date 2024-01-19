import { Router } from 'express'
import { pool } from '../db/mysql.js'

const router = Router()

router.get('/users', async (req, res) => {
  const result = await pool.query('SELECT * FROM users')
  res.json(result)
})

export default router