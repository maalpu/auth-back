import { Router } from 'express'
import { getCategory, getCategories, createCategory, updateCategory, deleteCategory } from '../controllers/categories.controller.js'

const router = Router()

router.get('/categories/:id', getCategory)

router.get('/categories', getCategories)

router.post('/categories', createCategory)

router.patch('/categories/:id', updateCategory)

router.delete('/categories/:id', deleteCategory)

export default router