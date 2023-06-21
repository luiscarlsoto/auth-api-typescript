import express from 'express'
import { createTask, deleteTask, editTask, getTask, getTasks } from '../controllers/task.controllers'

const router = express.Router()

router.post('/', createTask as express.RequestHandler)
router.get('/', getTasks as express.RequestHandler)
router.get('/:taskId', getTask as express.RequestHandler)
router.patch('/:taskId', editTask as express.RequestHandler)
router.delete('/:taskId', deleteTask as express.RequestHandler)

export default router
