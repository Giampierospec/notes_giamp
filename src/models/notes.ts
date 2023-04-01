import { Schema, model } from 'mongoose'

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
  arithmetics: { operation: NoteOperations; numbers: [number] }
  content?: string
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
  },
})

export const Notes = model('note', noteSchema)
