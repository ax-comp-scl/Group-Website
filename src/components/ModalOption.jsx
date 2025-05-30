import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import ButtonComponent from './Button'

export default function ModalOption(props) {
  return (
    <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="text-center">
              <p>Essa é uma ação irreversível</p>
            </ModalHeader>
            <ModalBody className="text-center">
              <p>Deseja continuar?</p>
            </ModalBody>
            <ModalFooter>
              <ButtonComponent
                size="md"
                color="danger"
                variant="light"
                text="Sim"
                onPress={props.handleConfirm}
              />
              <ButtonComponent
                size="md"
                color="default"
                variant="solid"
                text="Não"
                onPress={onClose}
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
