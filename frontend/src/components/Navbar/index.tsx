import { Link } from 'react-router-dom'
import FlexDiv from '../FlexDiv'
import Heading from '../Heading'
import CustomText from '../CustomText'
import CustomLink from '../CustomLink'

const Navbar: React.FC = () => {
  return (
    <FlexDiv className="justify-between sticky top-0 pt-4 pb-2 px-2 shadow-md rounded-sm">
      <CustomLink to="/">
        <Heading variant="h1">Notes</Heading>
      </CustomLink>
      <FlexDiv>
        <CustomLink to="/">
          <CustomText>Notes</CustomText>
        </CustomLink>
      </FlexDiv>
    </FlexDiv>
  )
}

export default Navbar
