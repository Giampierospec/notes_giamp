import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import client from '../../helpers/axios-helper'
import { toast } from 'react-toastify'

interface Note {
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
  },
})

export default noteSlice.reducer
