import app from './app.js'
import { PORT } from './src/config.js'

app.listen(PORT)
console.log('Server runing on port ' + PORT)
