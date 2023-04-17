import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import CustomButton from '../components/CustomButton'
import CustomText from '../components/CustomText'

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <Card className="translate-y-[50%]">
      <CustomText variant="custom" className="text-xl italic text-slate-500">
        Sorry, this page doesn't exist, maybe we're lost at sea?
      </CustomText>

      <CustomButton onClick={() => navigate(-1)}> go back</CustomButton>
    </Card>
  )
}

export default NotFoundPage
