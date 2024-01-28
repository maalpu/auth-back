import express from 'express'
import categoriesRoutes from './src/routes/categories.routes.js'
import productsRoutes from './src/routes/products.routes.js'
import promosRoutes from './src/routes/promos.routes.js'
import usersRoutes from './src/routes/users.routes.js'
import indexRoutes from './src/routes/index.routes.js'

const app = express()
app.use(express.json())

app.use(indexRoutes)
app.use('/api', categoriesRoutes)
app.use('/api', productsRoutes)
app.use('/api', promosRoutes)
app.use('/api', usersRoutes)

export default app