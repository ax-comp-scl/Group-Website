import InputComponent from "../components/adm/Input"
import ButtonComponent from "../components/adm/Button"
import SelectComponent from "../components/adm/Select"
import AccordionComponent from "../components/adm/Accordion"
import { useOutletContext } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { FormsContext } from "../FormsContext"

export default function AdditionalPublicationPage(){
    const { setLabel, setHover } = useOutletContext()
    const { handleFormChange, formData} = useContext(FormsContext)
    useEffect(() => {
        setHover("Two-column tab separated file. (feature.dbxref\\tpublication DOI)")
        setLabel("publicação")
    }, [])

    const [organism, setOrganism] = useState(formData.additional.publication.organism)
    const [soterm, setSoterm] = useState(formData.additional.publication.soterm)
    const [cpu, setCpu] = useState(formData.additional.publication.cpu | 1)

    const handleSubmit = () => {
        const publicationData = {
            organism,
            soterm,
            cpu
        }
        formData["additional"]["publication"] = publicationData
        handleFormChange(formData)
    }

    const organismsOptions = [
        "Organismo 1",
        "Organismo 2",
        "Organismo 3",
        "Organismo 4",
    ]

    const sotermOptions = [
        "SOTERM 1",
        "SOTERM 2",
        "SOTERM 3",
        "SOTERM 4",
    ]
    
    return(
        <>
            <div className="w-full flex flex-col items-center gap-10">
                <AccordionComponent
                itens = {[
                    {
                        isRequired: true,
                        fields: [
                            <SelectComponent isRequired={true} options={organismsOptions} defaultSelectedKeys={organism} label="organism" setValue={setOrganism} textOnHover="Species name (eg. Homo sapiens, Mus musculus)"/>,
                            <SelectComponent isRequired={true} options={sotermOptions} defaultSelectedKeys={organism} label="so_term" setValue={setSoterm} textOnHover="SO Sequence Ontology Term (eg. mRNA, polypeptide)"/>,
                        ]
                    },
                    {
                        fields: [
                            <InputComponent type="number" label="cpu" placeholder="0" value={cpu} onValueChange={setCpu} textOnHover="Number of threads"/>,
                        ]
                    },
                ]}/>
                <ButtonComponent text="Confirmar" onPress={handleSubmit}/>
            </div>
        </>
    )
}