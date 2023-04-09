import { createBrowserRouter } from 'react-router-dom'
import NotesPage from '../pages/notes'
import Layout from '../components/Layout'
import PrivateRoute from './PrivateRoute'
import LoginPage from '../pages/login'

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Layout>
          <NotesPage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <Layout>
        <LoginPage />
      </Layout>
    ),
  },
])

export default routes
