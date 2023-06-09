import { Schema, model } from 'mongoose'
import { hashPassword } from '../utils/encrypt-helper'
import jwt from 'jsonwebtoken'
import _ from 'lodash'

export interface IUser {
  email: string
  password: string
  firstname: string
  lastname: string
  generateAuthToken: () => string
}
const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
})

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await hashPassword(user.password)
  }
  next()
})

userSchema.methods.generateAuthToken = function () {
  const user = this
  try {
    return jwt.sign(
      { email: user.email, _id: user._id.toHexString() },
      process.env.JWT_SECRET || '',
      {
        expiresIn: '1d',
      }
    )
  } catch (error: any) {
    throw error
  }
}

userSchema.methods.toJSON = function () {
  const user = this
  return _.pick(user, ['email', 'firstname', 'lastname', '_id'])
}
export const User = model<IUser>('user', userSchema)
