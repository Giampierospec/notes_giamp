import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import client from '../../helpers/axios-helper'
import {
  LoginFormValues,
  RegisterFormValues,
} from '../../interfaces/auth.interface'

interface User {
  _id: string
  email: string
  firstname: string
  lastname: string
}
interface Auth {
  user?: User | null
  loading?: boolean
  error?: any
}

const initialState: Auth = { loading: false }

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const { data } = await client.get('/api/me')
  return data
})

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  const { data } = await client.get('/api/logout')
  return data
})

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (values: RegisterFormValues) => {
    const { data } = await client.post('/api/register', { ...values })
    return data
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: LoginFormValues) => {
    const { data } = await client.post('/api/login', { email, password })
    return data
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.loading = false
    })
    build.addCase(fetchUser.pending, (state, action) => {
      state.loading = true
    })
    build.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false
      state.user = null
      state.error = action.error
    })
    build.addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.loading = false
      toast.success('Login user succcessful', {
        position: 'bottom-center',
        theme: 'colored',
      })
    })
    build.addCase(loginUser.rejected, (state, action) => {
      state.error = action.error
      state.loading = false
      toast.error(`Login failed [Reason: ${action?.error?.message}]`, {
        position: 'bottom-center',
        theme: 'colored',
      })
    })

    build.addCase(logoutUser.fulfilled, (state, action) => {
      state.user = null
      state.loading = false
      toast.success(`Logout successful`, {
        position: 'bottom-center',
        theme: 'colored',
      })
    })
    build.addCase(logoutUser.rejected, (state, action) => {
      toast.error(`Logout  failed [Reason: ${action?.error?.message}]`, {
        position: 'bottom-center',
        theme: 'colored',
      })
      state.loading = false
    })
    build.addCase(
      createUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload
        toast.success('Created user successfully!', {
          position: 'bottom-center',
          theme: 'colored',
        })
      }
    )
    build.addCase(createUser.rejected, (state, action) => {
      toast.error(`User creation  failed [Reason: ${action?.error?.message}]`, {
        position: 'bottom-center',
        theme: 'colored',
      })
      state.loading = false
    })
  },
})

export default authSlice.reducer
