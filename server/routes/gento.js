import express from 'express'
import { register, login } from '../controllers/gento.controllers.js';

const gentoRouter = express.Router();

gentoRouter.post('/register', register)
gentoRouter.post('/sign-in', login)

export default gentoRouter;