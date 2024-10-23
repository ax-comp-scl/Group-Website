import MDropzone from "../components/adm/Dropzone"
import InputComponent from "../components/adm/Input"
import ButtonComponent from "../components/adm/Button"

export default function PublicationPage(){
    return(
        <>
            <div className="flex flex-col h-screen">
                <MDropzone label="Arquivo de Publicação"></MDropzone>
                <InputComponent type="number" label="CPU" placeholder="0"/>
                <ButtonComponent text="Confirmar"/>
            </div>
        </>
    )
}