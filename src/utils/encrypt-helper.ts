import { compare, genSalt, hash } from 'bcrypt'

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await compare(password, hashedPassword)
}

export const hashPassword = async (password: string) => {
  const salt = await genSalt(10)
  return await hash(password, salt)
}
