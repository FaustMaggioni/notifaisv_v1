
import bodyParser from 'body-parser';
import express from 'express';
import faiwebRoutes from './routes/faiweb.js';
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json(
    { limit: '30mb', extended: true }
))
app.use(bodyParser.urlencoded(
    { limit: '30mb', extended: true }
))
app.use(cors());

app.use('/fai', faiwebRoutes)

app.get('/', (req,res)=>{
    res.send('-Hello there -General Kenobiiiiiii')
})

app.listen(port,() => {
    console.log('Escuchando')
})








