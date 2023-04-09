import { Link } from 'react-router-dom'
import FlexDiv from '../FlexDiv'
import Heading from '../Heading'

const Navbar: React.FC = () => {
  return (
    <FlexDiv className="justify-between sticky top-0 pt-4 pb-2 px-2 shadow-sm rounded-sm">
      <Link to="/">
        <Heading variant="h1">Notes</Heading>
      </Link>
    </FlexDiv>
  )
}

export default Navbar
