import mongoose from 'mongoose'
import { config } from 'dotenv'
;(async () => {
  config()
  await mongoose.connect(process.env.MONGODB_URL)
  mongoose.Promise = global.Promise
})()
