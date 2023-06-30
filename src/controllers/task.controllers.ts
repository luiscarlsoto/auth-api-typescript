import { Request, Response } from 'express'
import { User } from '../entity/user'
import { respond } from '../helpers/commons.helper'
import { Task } from '../entity/task'
import { EntityNotFoundError } from 'typeorm'

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
        key: 'tasks.get.success'
      }
    })
  } catch (error: any) {
    respond(res, {
      status: {
        type: 'error',
        key: 'tasks.get.error',
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
        key: 'task.get.success'
      }
    })
  } catch (error: any) {
    if (error instanceof EntityNotFoundError) {
      respond(res, {
        status: {
          type: 'error',
          key: 'task.get.notFound'
        }
      })
    }
    respond(res, {
      status: {
        type: 'error',
        key: 'task.get.error',
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
        key: 'task.edit.success'
      }
    })
  } catch (error: any) {
    if (error instanceof EntityNotFoundError) {
      respond(res, {
        status: {
          type: 'error',
          key: 'task.edit.notFound'
        }
      })
    } else {
      respond(res, {
        status: {
          type: 'error',
          key: 'task.edit.error',
          message: error.message
        }
      })
    }
  }
}

export const deleteTask = async (req: Request, res: Response): Promise<any> => {
  try {
    const { taskId } = req.params

    const task = await Task.findOneByOrFail({
      id: Number(taskId)
    })

    task.deletedAt = new Date()
    await task.save()

    respond(res, {
      status: {
        type: 'success',
        key: 'task.delete.success'
      }
    })
  } catch (error: any) {
    if (error instanceof EntityNotFoundError) {
      respond(res, {
        status: {
          type: 'error',
          key: 'task.delete.notFound'
        }
      })
    } else {
      respond(res, {
        status: {
          type: 'error',
          key: 'auth.delete.error'
        }
      })
    }
  }
}
