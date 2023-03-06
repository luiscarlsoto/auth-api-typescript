import { NextFunction, Request, Response } from 'express'
import { check, CustomValidator } from 'express-validator'
import { User } from '../entity/user'
import { validate } from '../helpers/validateHelper.helper'

const isValidEmail: CustomValidator = async (value: string) => {
  const results = await User.findBy({ email: value })
  if (results.length > 0) { throw new Error('validation.emailAlreadyTaken') }
}

export const validateUserSignUp = [
  check('email')
    .isEmail().withMessage('validation.emailFormatError')
    .custom(isValidEmail)
    .isLength({ min: 3, max: 50 }).withMessage('validation.emailLengthError'),
  check('password')
    .isString().withMessage('validation.passwordFormatError')
    .isLength({ min: 5, max: 255 }).withMessage('validation.passwordLengthError'),
  check('image')
    .optional()
    .isString().withMessage('validation.imageFormatError')
    .isLength({ min: 3, max: 255 }).withMessage('validation.imageLengthError'),
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
    .isEmail().withMessage('validation.emailFormatError')
    .isLength({ min: 3, max: 50 }).withMessage('validation.emailLengthError'),
  check('password')
    .isString().withMessage('validation.passwordFormatError'),
  (req: Request, res: Response, next: NextFunction) => {
    validate(req, res, next)
  }
]
