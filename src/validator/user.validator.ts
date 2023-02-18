import { NextFunction, Request, Response } from 'express'
import { check, CustomValidator } from 'express-validator'
import { User } from '../entity/user'
import { validate } from '../helpers/validateHelper.helper'

const isValidEmail: CustomValidator = async (value: string) => {
  const results = await User.findBy({ email: value })
  if (results.length > 0) {
    throw new Error('Email already in use')
  }
}

export const validateUserSignUp = [
  check('email')
    .isEmail().withMessage('Must be a valid email')
    .custom(isValidEmail)
    .isLength({ min: 3, max: 50 }).withMessage('Must be a email between 3 and 50 characters'),
  check('password')
    .isString().withMessage('Must be a string')
    .isLength({ min: 5, max: 255 }).withMessage('Must be a password between 5 and 255 characters'),
  check('image')
    .optional()
    .isString().withMessage('Must be a string')
    .isLength({ min: 3, max: 255 }).withMessage('Must be a image between 3 and 255 characters'),
  check('created_at')
    .optional()
    .isString()
    .isLength({ min: 3, max: 50 }),
  check('updated_at')
    .optional()
    .isString()
    .isLength({ min: 3, max: 50 }),
  (req: Request, res: Response, next: NextFunction) => {
    validate(req, res, next)
  }
]

export const validateUserSignIn = [
  check('email')
    .isEmail().withMessage('Must be a valid email')
    .isLength({ min: 3, max: 50 }).withMessage('Must be a email between 3 and 50 characters'),
  check('password')
    .isString().withMessage('Must be a string')
    .isLength({ min: 5, max: 255 }).withMessage('Must be a password between 5 and 255 characters'),
  (req: Request, res: Response, next: NextFunction) => {
    validate(req, res, next)
  }
]
