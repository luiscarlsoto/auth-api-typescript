import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { respond } from '../helpers/commons.helper'

export const validateTokenMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1]

  if (token === '' || token === null) {
    return respond(res, {
      status: {
        type: 'error',
        key: 'auth.invalidToken',
        code: 401
      }
    })
  }

  try {
    jwt.verify(token ?? '', 'secreto') as Record<string, any>
    next()
    return
  } catch (error) {
    respond(res, {
      status: {
        type: 'error',
        key: 'auth.invalidToken',
        code: 401
      }
    })
  }
}
