import { RouterProvider } from 'react-router-dom'
import routes from './routes'
import Container from './components/Container'
import Navbar from './components/Navbar'

function App() {
  return <RouterProvider router={routes} />
}

export default App
