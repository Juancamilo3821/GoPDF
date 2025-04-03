import express from 'express'
import { getReport, getStats } from '../controllers/datafilesController.js'

const router = express.Router()

router.get('/', getStats)
router.get('/reporte', getReport)

export default router
