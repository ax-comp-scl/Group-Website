import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import ButtonComponent from './Button'

export default function ModalView(props) {
  return (
    <>
      <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {props.header}
              </ModalHeader>
              <ModalBody>{props.body}</ModalBody>
              <ModalFooter>
                <ButtonComponent
                  size="md"
                  color="default"
                  variant="solid"
                  text="Fechar"
                  onPress={onClose}
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
