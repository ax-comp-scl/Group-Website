import Dropzone from "../components/adm/Dropzone"
import InputComponent from "../components/adm/Input"
import ButtonComponent from "../components/adm/Button"
import { useState, useContext } from "react"
import { FormsContext } from "../FormsContext"

export default function OntologiesPage(){
    const { handleFormChange, formData} = useContext(FormsContext)
    const [cpu, setCpu] = useState(formData.ontology.cpu)

    const validateOntologyFile = (file) => {
        const regex = /\.(obo)$/i
        return regex.test(file.name) ? null : {
            code: "file-invalid-type",
            message: "Tipo de arquivo inválido. Somente arquivos .obo são permitidos."
        }
    }

    const handleSubmit = () => {
        const ontologyData = { cpu }
        formData["ontology"] = ontologyData
        handleFormChange(formData)
    }

    return(
        <>
            <div className="flex flex-col items-center gap-10">
                <Dropzone validator={validateOntologyFile} label="Arquivo de relacionamentos de ontologia"/>
                <Dropzone validator={validateOntologyFile} label="Arquivo de sequências de ontologia"/>
                <Dropzone validator={validateOntologyFile} label="Arquivo de genes de ontologia"/>
                <div className="w-7/12">
                    <InputComponent type="number" label="cpu" placeholder="0" value={cpu} onValueChange={setCpu} textOnHover="Number of threads"/>
                </div>
                <ButtonComponent text="Confirmar" onPress={handleSubmit}/>
            </div>
        </>
    )
}