import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { respond } from '../helpers/commons.helper'

export const validateTokenMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1]
  if (token === '' || token === null || token === undefined) {
    return respond(res, {
      status: {
        type: 'error',
        key: 'auth.invalidToken',
        code: 401
      }
    })
  }

  try {
    const { id }: any = jwt.verify(token ?? '', process.env.JWT_SECRET ?? 'SECRET_123', (err, decode) => {
      if (err != null) return console.error(err)
      return decode
    })
    res.locals.userId = id
    next()
  } catch (error: any) {
    respond(res, {
      status: {
        message: error.message,
        type: 'error',
        key: 'auth.invalidToken',
        code: 401
      }
    })
  }
}
