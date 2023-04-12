import { RouterProvider } from 'react-router-dom'
import routes from './routes'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { fetchUser } from './store/reducers/auth.reducer'

function App() {
  const { user, loading } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  useEffect(() => {
    ;(async () => {
      if (!user) {
        await dispatch(fetchUser())
      }
    })()
  }, [user, loading])
  return <RouterProvider router={routes} />
}

export default App
