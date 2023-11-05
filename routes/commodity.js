import express from 'express'
import { verifyAccessToken } from '../utils/jwt.js'
import {
  fetchAllCommodities,
  addCommodity
} from '../controllers/commodity.js'

const router = express.Router()

router.get('/', fetchAllCommodities)
router.post('/', verifyAccessToken, addCommodity)

export default router
