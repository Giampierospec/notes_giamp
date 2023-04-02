import { Schema, model } from 'mongoose'
import { performNoteSum } from '../utils/helpers'

export interface INote {
  title: string
  created?: Date
  updated?: Date
  color?: string
  arithmetics: { description?: string; numbers: [number]; total?: number }
  content?: string
  _userId?: Schema.Types.ObjectId
}

const noteSchema = new Schema<INote>({
  title: { type: String, required: true },
  content: { type: String },
  color: { type: String },
  created: { type: Date, default: new Date() },
  updated: { type: Date },
  arithmetics: {
    description: { type: String },
    numbers: [Number],
    total: { type: Number },
  },
  _userId: { type: Schema.Types.ObjectId },
})
noteSchema.pre('save', function (next) {
  const user = this
  if (user?.arithmetics?.numbers?.length) {
    user.arithmetics.total = performNoteSum(user.arithmetics.numbers)
  }
  next()
})
export const Notes = model<INote>('note', noteSchema)
