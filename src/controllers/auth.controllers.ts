import { Request, Response } from 'express'
import { User } from '../entity/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signUp = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body
    const user = new User()
    const encryptedPassword = await bcrypt.hash(String(password), 10)
    user.email = email
    user.password = encryptedPassword
    await user.save()
    return res.json({ message: 'Usuario registrado' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'An error occurred while user registration' })
  }
}

export const signIn = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body
    const tokenTest = req.body.token
    jwt.verify(tokenTest, process.env.JWT_SECRET ?? 'SECRET_123', (err: any, decoded: any) => {
      // eslint-disable-next-line no-extra-boolean-cast
      if (Boolean(err)) {
        console.log(err)
      } else {
        console.log(decoded)
      }
    })
    const result = await User.findOneOrFail({
      where: {
        email
      }
    })
    const isPasswordValid: boolean = await bcrypt.compare(String(password), result.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'You have entered an invalid username or password' })
    }

    const token = jwt.sign({ email, id: result.id }, process.env.JWT_SECRET ?? 'SECRET_123', { expiresIn: '60s' })

    return res.json({ token, message: 'You have successfully logged in' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'An error occurred while getting category' })
  }
}
