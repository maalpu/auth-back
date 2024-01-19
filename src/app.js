import express from 'express'
import categoriesRoutes from './routes/categories.routes.js'
import productsRoutes from './routes/products.routes.js'
import promosRoutes from './routes/promos.routes.js'
import usersRoutes from './routes/users.routes.js'

const app = express()
app.use(express.json())

app.use('/api', categoriesRoutes)
app.use('/api', productsRoutes)
app.use('/api', promosRoutes)
app.use('/api', usersRoutes)

export default app