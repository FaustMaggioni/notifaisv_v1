
import bodyParser from 'body-parser';
import express from 'express';
import faiwebRoutes from './routes/faiweb.js';
import cors from 'cors'

const app = express()
const port = 5000

app.use(bodyParser.json(
    { limit: '30mb', extended: true }
))
app.use(bodyParser.urlencoded(
    { limit: '30mb', extended: true }
))
app.use(cors());

app.use('/fai', faiwebRoutes)

app.listen(port, async () => {
    console.log('Escuchando')
})








