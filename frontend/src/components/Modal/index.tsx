import { Dialog } from '@headlessui/react'
import FlexDiv from '../FlexDiv'
import CustomButton from '../CustomButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from '../Card'
import Heading from '../Heading'

interface ModalProps {
  isOpen: boolean
  title?: string
  onClose: () => void
  children?: React.ReactNode | React.ReactNode[] | JSX.Element
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <FlexDiv className="fixed inset-0 items-center justify-center p-10">
        <Dialog.Panel className="mx-auto rounded bg-white p-10">
          <FlexDiv direction="column" className="w-full h-full py-4">
            <FlexDiv className="justify-between ">
              <Dialog.Title>
                <Heading variant="h3">{title}</Heading>
              </Dialog.Title>
              <CustomButton variant="secondary" onClick={onClose}>
                <FontAwesomeIcon icon={['fas', 'close']} />
              </CustomButton>
            </FlexDiv>
            {children}
          </FlexDiv>
        </Dialog.Panel>
      </FlexDiv>
    </Dialog>
  )
}

export default Modal
