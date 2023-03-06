import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { respond } from './commons.helper'

export const validate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    validationResult(req).throw()
    return next()
  } catch (error: any) {
    respond(res, {
      status: {
        type: 'error',
        key: error.array()[0].msg,
        code: 403
      }
    })
  }
}
