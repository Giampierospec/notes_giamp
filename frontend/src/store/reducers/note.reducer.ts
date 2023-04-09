import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import client from '../../helpers/axios-helper'
import { toast } from 'react-toastify'
import {
  CreateNoteFormValues,
  UpdateTitleFormValues,
} from '../../interfaces/note.interface'

interface Note {
  _id: string
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

interface NoteR {
  notes?: Note[] | null
  note?: Note | null
  loading?: boolean
}
const initialState: NoteR = {}

const getNotes = createAsyncThunk('note/getNotes', async () => {
  const { data } = await client.get('/api/notes')
  return data
})

const getNote = createAsyncThunk('note/getNotes', async (id: string) => {
  const { data } = await client.get(`/api/note/${id}`)
  return data
})

const createNote = createAsyncThunk(
  'note/createNote',
  async (values: CreateNoteFormValues) => {
    const { data } = await client.post('/api/notes', { ...values })

    return data
  }
)
const updateNote = createAsyncThunk('note/updateNote', async (values: Note) => {
  const { data } = await client.post(`/api/note/${values._id}`, { ...values })

  return data
})
const updateTitle = createAsyncThunk(
  'note/updateTitle',
  async (values: UpdateTitleFormValues) => {
    const { data } = await client.patch(`/api/note/title/${values.id}`, {
      ...values,
    })
    return data
  }
)

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(getNotes.pending, (state, action) => {
      state.loading = true
    })
    build.addCase(
      getNotes.fulfilled,
      (state, action: PayloadAction<Note[]>) => {
        state.loading = false
        state.notes = action.payload
      }
    )
    build.addCase(getNote.rejected, (state, action) => {
      state.loading = false
      state.notes = []
      toast.error('An error ocurred while fetching the notes', {
        position: 'bottom-center',
        theme: 'colored',
      })
    })
    build.addCase(getNote.pending, (state, action) => {
      state.loading = true
    })
    build.addCase(getNotes.fulfilled, (state, action: PayloadAction<Note>) => {
      state.loading = false
      state.note = action.payload
    })
    build.addCase(getNote.rejected, (state, action) => {
      state.loading = false
      state.note = null
      toast.error('An error ocurred while fetching the note', {
        position: 'bottom-center',
        theme: 'colored',
      })
    })
    build.addCase(createNote.pending, (state, action) => {
      state.loading = false
    })
    build.addCase(
      createNote.fulfilled,
      (state, action: PayloadAction<Note>) => {
        state.loading = false
        state.notes?.push(action.payload)
      }
    )
    build.addCase(createNote.rejected, (state, action) => {
      state.loading = false
      toast.error('An error ocurred while creating the note', {
        position: 'bottom-center',
        theme: 'colored',
      })
    })
    build.addCase(updateNote.pending, (state, action) => {
      state.loading = false
    })
    build.addCase(
      updateNote.fulfilled,
      (state, action: PayloadAction<Note>) => {
        state.loading = false
        const index =
          state.notes?.findIndex((x) => x._id === action.payload._id) ?? 0
        const notes = state.notes ?? []
        notes[index] = { ...action.payload }
      }
    )
    build.addCase(updateNote.rejected, (state, action) => {
      state.loading = false
      toast.error('An error ocurred while updating the note', {
        position: 'bottom-center',
        theme: 'colored',
      })
    })
    build.addCase(updateTitle.pending, (state, action) => {
      state.loading = false
    })
    build.addCase(
      updateTitle.fulfilled,
      (state, action: PayloadAction<Note>) => {
        state.loading = false
        const index =
          state.notes?.findIndex((x) => x._id === action.payload._id) ?? 0
        const notes = state.notes ?? []
        notes[index] = { ...action.payload }
      }
    )
    build.addCase(updateTitle.rejected, (state, action) => {
      state.loading = false
      toast.error('An error ocurred while updating the title for the note', {
        position: 'bottom-center',
        theme: 'colored',
      })
    })
  },
})

export default noteSlice.reducer
