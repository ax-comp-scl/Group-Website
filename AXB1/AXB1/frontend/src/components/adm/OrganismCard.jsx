import ExcludeIcon from "./ExcludeIcon"
import { ViewIconOpened } from "./ViewIconOpened"
import ButtonComponent from "./Button"
import ModalView from "./ModalView"
import ModalOption from "./ModalOption"
import { useState } from "react";

export default function OrganismCard(props){
    const [isViewOpen, setViewOpen] = useState(false); 
    const [isOptionOpen, setOptionOpen] = useState(false); 
    

    const handleViewOpen = () => {
        setViewOpen(true)
    }

    const handleOptionOpen = () => {
        setOptionOpen(true)
    }
    return( 
        <div className="rounded-lg bg-[#F5F5F5] border-2 max-w-72">
            <p className="m-5 text-center font-bold">{props.name}</p>
            <div class="divider"></div>
            <div className="flex justify-center items-center gap-5 p-3">
                <ButtonComponent
                    icon={<ViewIconOpened/>}
                    variant="ghost"
                    size={props.size}
                    color="default"
                    text="Visualizar"
                    onPress={handleViewOpen}
                />
                <ModalView
                    isOpen={isViewOpen}
                    onOpenChange={setViewOpen}
                    // body={}
                />
                <ButtonComponent
                        icon={<ExcludeIcon/>}
                        variant="ghost"
                        size={props.size}
                        color="default"
                        text="Excluir"
                        onPress={handleOptionOpen}
                    />
                <ModalOption
                        isOpen={isOptionOpen}
                        onOpenChange={setOptionOpen}
                        handleConfirm={() => {
                        setOptionOpen(false);
                        }}
                    />
            </div>
        </div>
    )
}