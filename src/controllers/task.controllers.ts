import { Request, Response } from 'express'
import { User } from '../entity/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { respond } from '../helpers/commons.helper'
import { Task } from '../entity/task'

export const createTask = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, description, done, userId } = req.body
    const task = new Task()
    const user = await User.findOne({
      where: {
        id: userId
      }
    })

    if (user == null) {
      return respond(res, {
        status: {
          type: 'error',
          key: 'task.create.userNotFound'
        }
      })
    }

    task.title = title
    task.description = description
    task.done = done
    task.user = user

    await task.save()

    const tasks = Task.find({
      relations: {
        user: true
      }
    })

    respond(res, {
      tasks,
      status: {
        type: 'success',
        key: 'task.create.success'
      }
    })
  } catch (error: any) {
    // console.error(error.message)
    respond(res, {
      status: {
        type: 'error',
        key: 'task.create.error',
        message: error.message
      }
    })
  }
}

export const getTasks = async (_req: Request, res: Response): Promise<any> => {
  try {
    const userId = res.locals.userId
    const user = await User.findOne({
      where: {
        id: userId
      },
      relations: {
        tasks: true
      }
    })

    respond(res, {
      tasks: user?.tasks,
      status: {
        type: 'success',
        key: 'task.updated.success'
      }
    })
  } catch (error: any) {
    respond(res, {
      status: {
        type: 'error',
        key: 'task.updated.error',
        message: error.message
      }
    })
  }
}

export const getTask = async (req: Request, res: Response): Promise<any> => {
  try {
    const { taskId } = req.params
    const { title, description, done } = req.body

    const task = await Task.findOneByOrFail({
      id: Number(taskId)
    })

    task.title = title
    task.description = description
    task.done = done

    await task.save()

    respond(res, {
      status: {
        type: 'success',
        key: 'task.updated.success'
      }
    })
  } catch (error: any) {
    // console.error(error.message)
    respond(res, {
      status: {
        type: 'error',
        key: 'task.updated.error',
        message: error.message
      }
    })
  }
}

export const editTask = async (req: Request, res: Response): Promise<any> => {
  try {
    const { taskId } = req.params
    const { title, description, done } = req.body

    const task = await Task.findOneByOrFail({
      id: Number(taskId)
    })

    task.title = title
    task.description = description
    task.done = done

    await task.save()

    respond(res, {
      status: {
        type: 'success',
        key: 'task.updated.success'
      }
    })
  } catch (error: any) {
    // console.error(error.message)
    respond(res, {
      status: {
        type: 'error',
        key: 'task.updated.error',
        message: error.message
      }
    })
  }
}

export const deleteTask = async (req: Request, res: Response): Promise<any> => {
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
