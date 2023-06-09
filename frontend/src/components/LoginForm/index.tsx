import { LoginFormValues } from '../../interfaces/auth.interface'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import FlexDiv from '../FlexDiv'
import { useForm } from 'react-hook-form'
import CustomText from '../CustomText'
import CustomInput from '../CustomInput'
import CustomButton from '../CustomButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void
}
const schema = yup.object({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
})
const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FlexDiv direction="column" className="p-10">
        <FlexDiv className="justify-between items-center">
          <FlexDiv className="items-center">
            <FontAwesomeIcon icon={['fas', 'envelope']} />
            <CustomText>Email</CustomText>
          </FlexDiv>
          <CustomInput
            {...register('email')}
            type="email"
            required={!!errors.email}
          />
        </FlexDiv>
        <FlexDiv className="justify-between items-center">
          <FlexDiv className="items-center">
            <FontAwesomeIcon icon={['fas', 'lock']} />
            <CustomText>Password</CustomText>
          </FlexDiv>
          <CustomInput
            {...register('password')}
            type="password"
            required={!!errors.password}
          />
        </FlexDiv>
        <CustomButton
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          Login
        </CustomButton>
      </FlexDiv>
    </form>
  )
}
export default LoginForm
