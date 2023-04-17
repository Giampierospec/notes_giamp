import { Link } from 'react-router-dom'
import FlexDiv from '../FlexDiv'
import Heading from '../Heading'
import CustomText from '../CustomText'
import CustomLink from '../CustomLink'
import { useAppSelector } from '../../store/hooks'

const Navbar: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth)
  return (
    <FlexDiv className="justify-between sticky top-0 pt-4 pb-2 px-2 shadow-md rounded-sm bg-white">
      <CustomLink to="/">
        <Heading variant="h1">Notes</Heading>
      </CustomLink>
      <FlexDiv>
        {user
          ? loginRoutes.map((route, index) => (
              <CustomLink to={route.to} key={index}>
                <CustomText>{route.text}</CustomText>
              </CustomLink>
            ))
          : authRoutes.map((route, index) => (
              <CustomLink to={route.to} key={index}>
                <CustomText>{route.text}</CustomText>
              </CustomLink>
            ))}
      </FlexDiv>
    </FlexDiv>
  )
}

const authRoutes = [
  {
    to: '/login',
    text: 'Login',
  },
  {
    to: '/register',
    text: 'Register',
  },
]

const loginRoutes = [
  {
    to: '/create-note',
    text: 'Create Note',
  },
]

export default Navbar
