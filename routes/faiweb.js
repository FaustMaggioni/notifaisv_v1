import express from 'express'
import { getNoticias, updateNoticias } from '../controlers/faiweb.js'
const router = express.Router();

router.get('/', getNoticias)
router.get('/events', updateNoticias)
export default router