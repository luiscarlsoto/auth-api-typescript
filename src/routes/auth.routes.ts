import express from 'express'
import { signIn, signUp } from '../controllers/auth.controllers'

const router = express.Router()

router.post('/signup', signUp as express.RequestHandler)

router.get('/signin', signIn as express.RequestHandler)

export default router
