import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const validateTokenMiddleware = (req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined => {
  const token = req.headers.authorization?.split(' ')[1]

  if (token === '' || token === null) {
    return res.status(401).json({ mensaje: 'No se ha proporcionado un token' })
  }

  try {
    jwt.verify(token ?? '', 'secreto') as Record<string, any>
    next()
  } catch (error) {
    return res.status(403).json({ mensaje: 'Token no válido' })
  }
}
