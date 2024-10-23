import MDropzone from "../components/adm/Dropzone"
import InputComponent from "../components/adm/Input"
import ButtonComponent from "../components/adm/Button"

export default function OntologiesPage(){
    return(
        <>
            <div className="flex flex-col h-screen">
                <MDropzone label="Arquivo de relacionamentos de ontologia"/>
                <MDropzone label="Arquivo de sequências de ontologia"/>
                <MDropzone label="Arquivo de genes de ontologia"/>
                <InputComponent type="number" label="CPU" placeholder="0"/>
                <ButtonComponent className="max-w-xs" text="Confirmar"/>
            </div>
        </>
    )
}