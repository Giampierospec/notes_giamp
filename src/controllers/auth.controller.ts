import { NextFunction, Response } from 'express'
import { ExpandedRequest } from '../middleware/auth'
import { validationResult } from 'express-validator'
import { comparePassword } from '../utils/encrypt-helper'
import { IUser, User } from '../models/user'

export const login = async (
  req: ExpandedRequest,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() })
  }
  try {
    const { email, password } = req.body
    const user = await User.findOne({
      email,
    })
    if (!user) {
      return res.status(401).send(`User with email ${email} doesn't exist`)
    }
    const compare = await comparePassword(password, user?.password || '')
    if (compare) {
      req.session.token = await user.generateAuthToken()
      return res.status(200).send(user.toJSON())
    }
    return res.status(400).send("Password doesn't match")
  } catch (error) {
    return next(error)
  }
}
export const me = async (
  req: ExpandedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).send(req.user)
  } catch (error) {
    return next(error)
  }
}
export const logout = (
  req: ExpandedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    req.session = null
    return res.status(200).send(null)
  } catch (error) {
    return next(error)
  }
}

export const register = async (
  req: ExpandedRequest,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() })
  }
  try {
    const user = req.body as IUser
    const exists = await User.exists({
      email: user.email,
    })
    if (exists) {
      return res.status(400).send(`User with ${user.email} already exists`)
    }
    const createdUser = await User.create({
      ...req.body,
    })
    req.session.token = await createdUser.generateAuthToken()
    return res.status(200).send(createdUser.toJSON())
  } catch (error) {
    return next(error)
  }
}
