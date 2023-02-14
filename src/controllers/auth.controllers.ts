import { Request, Response } from 'express'

export const signUp = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log(req.body)
    return res.json({ message: 'Usuario registrado' })
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while getting categories' })
  }
}

export const signIn = async (_req: Request, res: Response): Promise<any> => {
  try {
    return res.json({ message: 'Sesión iniciada' })
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while getting category' })
  }
}
