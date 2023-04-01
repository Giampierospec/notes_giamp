import { Router } from 'express'
import {
  checkIfAlreadyLoggedIn,
  checkIfIsAuthenticated,
} from '../middleware/auth'
import { login, logout, me, register } from '../controllers/auth.controller'
import { check } from 'express-validator'

const router = Router()

router
  .route('/login')
  .post(
    checkIfAlreadyLoggedIn,
    check('email')
      .normalizeEmail()
      .isEmail()
      .notEmpty()
      .withMessage('Email is required'),
    check('password')
      .isLength({ min: 6 })
      .notEmpty()
      .withMessage('Password is required'),
    login
  )

router
  .route('/register')
  .post(
    checkIfAlreadyLoggedIn,
    check('email')
      .normalizeEmail()
      .isEmail()
      .notEmpty()
      .withMessage('Email is required'),
    check('password')
      .isLength({ min: 6 })
      .notEmpty()
      .withMessage('Password is required'),
    check('firstname').notEmpty().withMessage('firstname is required'),
    check('lastname').notEmpty().withMessage('lastname is required'),
    register
  )

router.route('/me').get(checkIfIsAuthenticated, me)
router.route('/logout').get(checkIfIsAuthenticated, logout)

export default router
