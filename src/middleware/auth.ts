import { IUser, User } from '../models/user'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
export interface ExpandedRequest extends Request {
  user?: IUser & { _id?: string }
  session: { token?: string } | null
}
export const checkIfIsAuthenticated = async (
  req: ExpandedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.session?.token
  if (!token) {
    return res.status(401).send('Unauthorized action')
  }
  let verify: any
  try {
    verify = jwt.verify(token || '', process.env.JWT_SECRET || '')
  } catch (error) {}
  if (!verify?._id) {
    return res.status(401).send('Invalid token')
  }
  const user = await User.findById(verify._id)
  if (!user) return res.status(404).send('User not found')
  req.user = user.toJSON() as IUser
  next()
}
export const checkIfAlreadyLoggedIn = (
  req: ExpandedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.token) {
    next()
  } else res.status(403).send('Already Logged in')
}
