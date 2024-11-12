import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useState } from "react";
import ButtonComponent from "./Button";
import ModalOption from "./ModalOption";

export default function ModalEdit(props) {
  const [isOptionOpen, setOptionOpen] = useState(false);

  const handleConfirm = () => {
    props.onOpenChange(false);
    setOptionOpen(true);
  };

  return (
    <>
      <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {props.header}
              </ModalHeader>
              <ModalBody className="flex flex-col items-center">
                {props.body}
              </ModalBody>
              <ModalFooter>
                <ButtonComponent
                  size="md"
                  color="danger"
                  variant="light"
                  text="Confirmar"
                  onPress={handleConfirm}
                />
                <ButtonComponent
                  size="md"
                  color="default"
                  variant="solid"
                  text="Cancelar"
                  onPress={onClose}
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <ModalOption
        isOpen={isOptionOpen}
        onOpenChange={setOptionOpen}
        handleConfirm={async () => {
          props.handleEdit()
          setOptionOpen(false);
        }}
      />
    </>
  );
}
