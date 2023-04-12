import { Router } from 'express'
import { checkIfIsAuthenticated } from '../middleware/auth'
import {
  createNotes,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
  updateTitle,
} from '../controllers/note.controller'
import { check } from 'express-validator'

const router = Router()

router
  .route('/notes')
  .get(checkIfIsAuthenticated, getNotes)
  .post(
    checkIfIsAuthenticated,
    check('title').notEmpty().withMessage('Title is required'),
    createNotes
  )
router
  .route('/note/:id')
  .get(checkIfIsAuthenticated, getNote)
  .put(
    checkIfIsAuthenticated,
    check('title').notEmpty().withMessage('Title is required'),
    updateNote
  )
  .delete(checkIfIsAuthenticated, deleteNote)

router
  .route('/note/title/:id')
  .patch(
    checkIfIsAuthenticated,
    check('title').notEmpty().withMessage('Title is required'),
    updateTitle
  )

export default router
