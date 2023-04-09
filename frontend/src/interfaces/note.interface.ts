export interface CreateNoteFormValues {
  title: string
  created?: Date
  updated?: Date
  color?: string
  arithmetics: {
    numbers: { description?: string; digits: number }[]
    total?: number
  }
  content?: string
  _userId?: string
}

export interface UpdateTitleFormValues {
  id: string
  title: string
}
