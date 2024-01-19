import { Router } from 'express'
import { getPromo, getPromos, createPromo, updatePromo, deletePromo } from '../controllers/promos.controller.js'

const router = Router()

router.get('/promos/:id', getPromo)

router.get('/promos', getPromos)

router.post('/promos', createPromo)

router.patch('/promos/:id', updatePromo)

router.delete('/promos/:id', deletePromo)

export default router
