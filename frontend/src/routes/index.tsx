import { createBrowserRouter } from 'react-router-dom'
import NotesPage from '../pages/notes'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <NotesPage />,
  },
])

export default routes
