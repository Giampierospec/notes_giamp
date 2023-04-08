import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth.reducer'
import noteReducer from './reducers/note.reducer'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    note: noteReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
