import { Router } from 'express'
import { checkIfIsAuthenticated } from '../middleware/auth'
import {
  createNotes,
  getNote,
  getNotes,
  updateNote,
  updateTitle,
} from '../controllers/note.controller'

const router = Router()

router
  .route('/notes')
  .get(checkIfIsAuthenticated, getNotes)
  .post(checkIfIsAuthenticated, createNotes)
router
  .route('/note/:id')
  .get(checkIfIsAuthenticated, getNote)
  .put(checkIfIsAuthenticated, updateNote)

router.route('/note/title/:id').patch(checkIfIsAuthenticated, updateTitle)

export default router
