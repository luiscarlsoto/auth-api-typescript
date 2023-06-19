import express from 'express'
import { createTask, deleteTask, editTask, getTasks } from '../controllers/task.controllers'
import { validateTokenMiddleware } from '../validator/token.validator'

const router = express.Router()

router.post('/', validateTokenMiddleware, createTask as express.RequestHandler)
router.get('/:taskId', getTasks as express.RequestHandler)
router.patch('/:taskId', editTask as express.RequestHandler)
router.delete('/:taskId', deleteTask as express.RequestHandler)

export default router
