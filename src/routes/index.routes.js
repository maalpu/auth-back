import { Router } from 'express'
import { pool } from '../db/mysql.js'

const router = Router()

router.get('/ping', async (req, res) => {
  const [result] = await pool.query('SELECT "Pong" AS result', req)
  res.json(result[0])
})

export default router