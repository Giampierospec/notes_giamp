import { useCallback, useEffect } from 'react'
import FlexDiv from '../components/FlexDiv'
import Heading from '../components/Heading'
import LoginForm from '../components/LoginForm'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { createUser } from '../store/reducers/auth.reducer'
import { RegisterFormValues } from '../interfaces/auth.interface'
import RegisterForm from '../components/RegisterForm'
import Card from '../components/Card'

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { user, loading } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  const [search] = useSearchParams()
  useEffect(() => {
    if (user) navigate(search.get('returnUrl') ?? '/')
  }, [user, navigate])
  const onSubmit = useCallback(
    async (values: RegisterFormValues) => {
      await dispatch(createUser(values))
    },
    [user]
  )
  return (
    <FlexDiv>
      <Card className="justify-center items-center">
        <Heading>Register</Heading>
        <RegisterForm onSubmit={onSubmit} />
      </Card>
    </FlexDiv>
  )
}

export default RegisterPage
