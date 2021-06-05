import express from 'express'
import { getNoticias, updateNoticias } from '../controlers/faiweb.js'
import { getTrabajos, updateTrabajos } from '../controlers/bolsadetrabajo.js'
import { getPasantias, updatePasantias } from '../controlers/pasantias.js'

const router = express.Router();

router.get('/', getNoticias)
router.get('/events', updateNoticias)
router.get('/trabajos', getTrabajos)
router.get('/trabajos/update', updateTrabajos)
router.get('/pasantias', getPasantias)
router.get('/pasantias/update', updatePasantias)

export default router
