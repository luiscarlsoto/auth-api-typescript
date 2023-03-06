import { Request, Response } from 'express'
import { User } from '../entity/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { respond } from '../helpers/commons.helper'

export const signUp = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body
    const user = new User()
    const encryptedPassword = await bcrypt.hash(String(password), 10)
    user.email = email
    user.password = encryptedPassword
    await user.save()

    const token = jwt.sign({ email }, process.env.JWT_SECRET ?? 'SECRET_123', { expiresIn: '60s' })

    respond(res, {
      token,
      status: {
        type: 'success',
        key: 'auth.signup.success'
      }
    })
  } catch (error) {
    respond(res, {
      status: {
        type: 'error',
        key: 'auth.signup.error'
      }
    })
  }
}

export const signIn = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body

    const result = await User.findOne({
      where: {
        email
      }
    })

    if (result == null) {
      return respond(res, {
        status: {
          type: 'error',
          key: 'auth.signin.invalidCredentials'
        }
      })
    }

    const isPasswordValid: boolean = await bcrypt.compare(String(password), result.password)

    if (!isPasswordValid) {
      return respond(res, {
        status: {
          type: 'error',
          key: 'auth.signin.invalidCredentials'
        }
      })
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET ?? 'SECRET_123', { expiresIn: '60s' })
    respond(res, {
      token,
      status: {
        type: 'success',
        key: 'auth.signin.success'
      }
    })
  } catch (error) {
    respond(res, {
      status: {
        type: 'error',
        key: 'auth.signin.error'
      }
    })
  }
}
