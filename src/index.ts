import express, { NextFunction } from 'express'
import { config } from 'dotenv'
import bodyParser from 'body-parser'
import path from 'path'
const cookieSession = require('cookie-session')
import cors from 'cors'
import './db/init'
import { errorHandler } from './middleware/error-handler'
config()
const app = express()
const PORT = process.env.PORT || 4000
app.use(
  cors({
    credentials: true,
  })
)
app.use(bodyParser.json({ limit: '50mb' }))
app.use(
  cookieSession({
    keys: [process.env.COOKIE_SECRET || ''],
    maxAge: 24 * 60 * 60 * 1000,
  })
)
app.use(errorHandler)
if (process.env.NODE_ENV === 'production') {
  // Express will serve Production Assets
  app.use(express.static(`${process.env.BASE_FRONTEND_PATH}/frontend/dist`))

  //Express will serve up the index.html
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        process.env.BASE_FRONTEND_PATH,
        'frontend',
        'dist',
        'index.html'
      )
    )
  })
}
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
