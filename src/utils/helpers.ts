import { NoteOperations } from '../models/notes'

export const performOperations = (
  operation: NoteOperations,
  numbers: number[]
) => {
  switch (operation) {
    case NoteOperations.SUM:
      return numbers.reduce((a, b) => a + b)
    case NoteOperations.SUBSTRACTION:
      return numbers.reduce((a, b) => a - b)
    case NoteOperations.MULTIPLICATION:
      return numbers.reduce((a, b) => a * b)
    case NoteOperations.DIVISION:
      return numbers.reduce((a, b) => (b === 0 ? 0 : a / b))
  }
}
