import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

interface PrivateRouteProps {
  children: React.ReactNode
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth.user)
  const { pathname } = useLocation()
  useEffect(() => {
    if (!user) {
      navigate(`/login?returnUrl=${pathname}`)
    }
  }, [user, navigate])
  return <div className="flex flex-col">{children}</div>
}

export default PrivateRoute
