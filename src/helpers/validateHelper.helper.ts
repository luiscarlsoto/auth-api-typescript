import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

interface CustomValidatorMsg {
  msg: string
  param: string
}

export const validate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    validationResult(req).throw()
    return next()
  } catch (error: any) {
    res.status(403)
    res.send({ error: error.array().map((error: CustomValidatorMsg) => ({ message: error.msg, param: error.param, code: 403 })) })
  }
}
