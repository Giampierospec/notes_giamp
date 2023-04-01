import { Schema, model } from 'mongoose'

export enum NoteOperations {
  SUM,
  SUBSTRACTION,
  MULTIPLICATION,
  DIVISION,
}
interface INote {
  title: string
  color?: string
  arithmetics: { operation: NoteOperations; numbers: [number] }
  content?: string
}

const noteSchema = new Schema<INote>({
  title: { type: String, required: true },
  content: { type: String },
  color: { type: String },
  arithmetics: {
    operation: { type: Number, enum: NoteOperations },
    numbers: [Number],
  },
})

export const Notes = model('note', noteSchema)
