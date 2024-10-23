// export default function ModalButton(props){
//     return(
//         <button className={props.classes} onClick={()=>document.getElementById(props.idModal).showModal()}>
//             {props.icon}{props.action}
//         </button>
//     )
// }
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import ButtonComponent from "./Button";

export default function ModalButton(props) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
        <ButtonComponent icon={props.icon} size={props.size} color={props.color} text={props.text} onPress={onOpen}/>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">
                    {props.action === "Editar" ? "Editar usuário" : "Visualizando usuário"}
                </ModalHeader>
                <ModalBody>
                    {props.content}
                    <p> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                    dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                    Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                    Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                    proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                    </p>
                </ModalBody>
                <ModalFooter>
                    <ButtonComponent size="lg" color="primary" text="Modal" onPress={onOpen}/>
                    <Button color="danger" variant="light" onPress={onClose}>
                    Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                    Action
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    </>
  );
}
