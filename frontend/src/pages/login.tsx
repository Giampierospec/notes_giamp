import { useCallback, useEffect } from 'react'
import FlexDiv from '../components/FlexDiv'
import Heading from '../components/Heading'
import LoginForm from '../components/LoginForm'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { loginUser } from '../store/reducers/auth.reducer'
import { LoginFormValues } from '../interfaces/auth.interface'
import Card from '../components/Card'

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { user, loading } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  const [search] = useSearchParams()
  useEffect(() => {
    if (user) navigate(search.get('returnUrl') ?? '/')
  }, [user, navigate])
  const onSubmit = useCallback(
    async (values: LoginFormValues) => {
      await dispatch(loginUser(values))
      if (user) {
        navigate(search.get('returnUrl') ?? '/')
      }
    },
    [user]
  )
  return (
    <Card className="justify-center items-center">
      <Heading>Login</Heading>
      <LoginForm onSubmit={onSubmit} />
    </Card>
  )
}

export default LoginPage
