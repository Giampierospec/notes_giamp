import {
  LoginFormValues,
  RegisterFormValues,
} from '../../interfaces/auth.interface'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import FlexDiv from '../FlexDiv'
import { useForm } from 'react-hook-form'
import CustomText from '../CustomText'
import CustomInput from '../CustomInput'
import CustomButton from '../CustomButton'
interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => void
}
const schema = yup.object({
  email: yup.string().required('Email is required'),
  firstname: yup.string().required('firstname is required'),
  lastname: yup.string().required('lastname is required'),
  password: yup.string().required('Password is required'),
})
const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
    } as RegisterFormValues,
    resolver: yupResolver(schema),
  })
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FlexDiv direction="column" className="p-10">
        <FlexDiv className="justify-between">
          <CustomText>First Name</CustomText>
          <CustomInput
            {...register('firstname')}
            type="text"
            required={!!errors.firstname}
          />
        </FlexDiv>
        <FlexDiv className="justify-between">
          <CustomText>Last Name</CustomText>
          <CustomInput
            {...register('lastname')}
            type="text"
            required={!!errors.lastname}
          />
        </FlexDiv>
        <FlexDiv className="justify-between">
          <CustomText>Email</CustomText>
          <CustomInput
            {...register('email')}
            type="email"
            required={!!errors.email}
          />
        </FlexDiv>
        <FlexDiv className="justify-between">
          <CustomText>Password</CustomText>
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
          Register
        </CustomButton>
      </FlexDiv>
    </form>
  )
}
export default RegisterForm
