import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import gentoRouter from './routes/gento.js';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config()
const app = express();

app.use(cors());
app.use(express.json())
app.use(morgan("common"))
app.use(bodyParser.json())

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "public/assets")
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// })
// const uplodad = multer({ storage })

//GentoRoutes
app.use('/gento', gentoRouter)

const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
    const data = { school: "Hello school hubt" }
    res.send(data)
})


mongoose
    .connect('mongodb://localhost:27017/gento', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then((app.listen(PORT, () => console.log(`Gento is running ${PORT}`))
    ));