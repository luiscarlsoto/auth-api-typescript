import express from 'express'
import { signIn, signUp } from '../controllers/auth.controllers'
import { validateUserSignIn, validateUserSignUp } from '../validator/user.validator'

const router = express.Router()

router.post('/signup', validateUserSignUp, signUp as express.RequestHandler)

router.post('/signin', validateUserSignIn, signIn as express.RequestHandler)

export default router
