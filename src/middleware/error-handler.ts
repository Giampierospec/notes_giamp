import { NextFunction, Response, Request } from 'express'
import { createLogger, format, transports } from 'winston'
const logger = createLogger({
  level: 'error',
  format: format.json(),
  transports: [
    new transports.File({
      level: 'error',
      filename: `${process.cwd()}/src/log/log.log`,
    }),
  ],
})
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.log('error', err.message)
  return res.status(500).send('An error has occurred please try again later.')
}
