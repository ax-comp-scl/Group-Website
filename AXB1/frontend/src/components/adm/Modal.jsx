import ModalOption from "./ModalOption"
import ModalEdit from "./ModalEdit"
import ModalView from "./ModalView"
import ButtonComponent from "./Button"

import { useState } from "react";

export default function Modal(props){
    const [isViewOpen, setViewOpen] = useState(false); 
    const [isEditOpen, setEditOpen] = useState(false); 
    const [isOptionOpen, setOptionOpen] = useState(false); 

    const handleViewOpen = () => {
        setViewOpen(true)
    }

    const handleEditOpen = () => {
        setEditOpen(true)
    }

    const handleOptionOpen = () => {
        setOptionOpen(true)
    }

    return (
    <>
        <ButtonComponent
        icon={props.icon}
        variant={props.variant}
        size={props.size}
        color={props.color}
        text={props.action}
        onPress={
            props.action === "Editar"
            ? handleEditOpen
            : props.action === "Visualizar"
            ? handleViewOpen
            : handleOptionOpen
        }
        />

        <ModalView
        isOpen={isViewOpen}
        onOpenChange={setViewOpen}
        content={props.content}
        />

        <ModalEdit
        isOpen={isEditOpen}
        onOpenChange={setEditOpen}
        content={props.content}
        />

        <ModalOption
        isOpen={isOptionOpen}
        onOpenChange={setOptionOpen}
        handleConfirm={() => {
            setOptionOpen(false);
        }}
        />
    </>
    )
}