export interface CreateNoteFormValues {
  _id: string
  title: string
  color?: string
  arithmetics: {
    numbers: { description?: string; digits: number }[]
  }
  content?: string
  _userId?: string
}

export interface UpdateTitleFormValues {
  id: string
  title: string
}
