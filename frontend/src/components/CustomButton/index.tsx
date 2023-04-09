import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { buttonVariantMapperClasses } from '../../mappers/div-mapper'

interface CustomButtonProps {
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'danger'
  children: React.ReactNode
}
const CustomButton: React.FC<
  CustomButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, variant = 'primary', loading = false, ...rest }) => {
  return (
    <button
      {...rest}
      className={`${buttonVariantMapperClasses[variant]} text-white font-serif text-sm uppercase rounded-sm py-2 px-6 outline outline-current disabled:opacity-25 ${rest.className}`}
    >
      <div className="flex gap-x-2 justify-center">
        {loading && <FontAwesomeIcon icon={['fas', 'spinner']} spin />}
        {children}
      </div>
    </button>
  )
}
export default CustomButton
