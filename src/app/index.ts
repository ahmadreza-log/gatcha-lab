import express, { type Express } from 'express'
import dotenv from 'dotenv'
import mongoose from "mongoose"
import { Liquid } from 'liquidjs'
import { join } from 'path'

import WebRoutes from '@/routes/web'
import ApiRoutes from '@/routes/api'
import logger from '@/lib/logger'

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config()

// Create Express app
const app: Express = express()

// Define express server port
const port = process.env.PORT || 3000

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
const database = mongoose.connection

// Send error if program can't connect to database.
database.on('error', error => logger.error(error))

// Send success message if program can connect to database.
database.once('open', () => logger.info(`Database Connected to ${process.env.MONGODB_URI}`))

// Create Liquid engine
const engine = new Liquid({
    root: join(process.cwd(), 'src/views'),
    extname: '.liquid',
    cache: false
})

// Set view engine
app.engine('liquid', engine.express())
app.set('views', join(process.cwd(), 'src/views'))
app.set('view engine', 'liquid')

// Set public folder
app.use(express.static('public'))

// Set routes
app.use('/', WebRoutes)
app.use('/api', ApiRoutes)

// Start server
app.listen(port, () => logger.info(`Starting On http://localhost:${port}`))