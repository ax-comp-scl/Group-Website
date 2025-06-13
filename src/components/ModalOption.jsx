import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import ButtonComponent from './Button'
import { Loader2 } from 'lucide-react'

export default function ModalOption(props) {
  return (
    <Modal 
        isOpen={props.isOpen} 
        onOpenChange={props.onOpenChange}
        isDismissable={!props.isConfirming}
        hideCloseButton={props.isConfirming}
    >
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
                text={props.isConfirming ? 'Excluindo...' : 'Sim'}
                onPress={props.handleConfirm}
                disabled={props.isConfirming}
                icon={props.isConfirming ? <Loader2 className="w-5 h-5 animate-spin" /> : undefined}
              />
              <ButtonComponent
                size="md"
                color="default"
                variant="solid"
                text="Não"
                onPress={onClose}
                disabled={props.isConfirming}
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}