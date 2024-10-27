import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import initRouter from './routes/index.js'
import sequelize from './config/database.js'
import { APP_CONFIG, DB_CONFIG } from './util/config.js'

dotenv.config()
const app = express()
const corsOptions = {
    origin: '*',
}
// config corsOptions
app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get(`${APP_CONFIG.ENV}/`, (req, res) => {
    res.json({ message: 'hello', status: 200 })
})

initRouter(app)

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been stablised successfully.')
    })
    .catch(err => {
        console.log('Unable to connect to the database', err)
    })
app.listen(APP_CONFIG.PORT, () => {
    console.log(`Server is running on port ${APP_CONFIG.PORT}`)
})
