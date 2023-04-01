import { Schema, model } from 'mongoose'
import { performOperations } from '../utils/helpers'

export enum NoteOperations {
  SUM,
  SUBSTRACTION,
  MULTIPLICATION,
  DIVISION,
}
interface INote {
  title: string
  created?: Date
  updated?: Date
  color?: string
  arithmetics: { operation: NoteOperations; numbers: [number]; total?: number }
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
    operation: { type: Number, enum: NoteOperations },
    numbers: [Number],
    total: { type: Number },
  },
  _userId: { type: Schema.Types.ObjectId },
})
noteSchema.pre('save', function () {
  const user = this
  if (user?.arithmetics?.numbers?.length) {
    user.arithmetics.total = performOperations(
      user.arithmetics.operation,
      user.arithmetics.numbers
    )
  }
})
export const Notes = model('note', noteSchema)
