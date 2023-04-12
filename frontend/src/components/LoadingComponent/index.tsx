import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LoadingComponent: React.FC = () => {
  return (
    <div className="flex flex-col mx-auto py-2">
      <FontAwesomeIcon icon={['fas', 'circle-notch']} size="6x" spin />
    </div>
  )
}

export default LoadingComponent
