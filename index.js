import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import authRoutes from './routes/auth.js'
import aliyunRoutes from './routes/aliyun.js'
import commodityRoutes from './routes/commodity.js'

// config
dotenv.config()

// init app
const app = express()

// middleware
app.use(cors())
app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))

// routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/aliyun', aliyunRoutes)
app.use('/api/v1/commodity', commodityRoutes)

// mongodb
const db = process.env.MONGODB
const port = process.env.PORT
mongoose.set('strictQuery', true)
mongoose.connect(db)
  .then(() => {
    console.log('Connected to mongodb')
    app.listen(port, () => console.log(`Server running on port ${port}`))
  })
  .catch(error => console.log('Fail to connect mongodb', error))
