import { createBrowserRouter } from 'react-router-dom'
import NotesPage from '../pages/notes'
import Layout from '../components/Layout'
import PrivateRoute from './PrivateRoute'
import LoginPage from '../pages/login'
import RegisterPage from '../pages/register'

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
  {
    path: '/register',
    element: (
      <Layout>
        <RegisterPage />
      </Layout>
    ),
  },
])

export default routes
