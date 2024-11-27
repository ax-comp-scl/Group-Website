import InputComponent from "../components/Input"
import ButtonComponent from "../components/Button"
import SelectComponent from "../components/Select"
import AccordionComponent from "../components/Accordion"
import { useOutletContext } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { FormsContext } from "../FormsContext"
import { postData } from "../services/RequestsService"
import SelectOrganisms from "../components/SelectOrganisms"

export default function AdditionalPublicationPage() {
    const { setLabel, setHover } = useOutletContext()
    const { handleFormChange, formData } = useContext(FormsContext)
    useEffect(() => {
        setHover("Two-column tab separated file. (feature.dbxref\\tpublication DOI)")
        setLabel("publicação")
    }, [])

    const [organism, setOrganism] = useState(formData.additional.publication.organism)
    const [soterm, setSoterm] = useState(formData.additional.publication.soterm)
    const [cpu, setCpu] = useState(formData.additional.publication.cpu | 1)

    const handleSubmit = async () => {
        //await postData("", {})
    }

    useEffect(() => {
        const publicationData = {
            organism,
            soterm,
            cpu
        }
        formData["additional"]["publication"] = publicationData
        handleFormChange(formData)
    }, [organism, soterm, cpu])


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

    return (
        <>
            <div className="w-full flex flex-col items-center gap-10">
                <AccordionComponent
                    itens={[
                        {
                            isRequired: true,
                            fields: [
                                <SelectOrganisms setValue={setOrganism} key="organism" />,
                                <SelectComponent isRequired={true} options={sotermOptions} defaultSelectedKeys={organism} label="so_term" setValue={setSoterm} textOnHover="SO Sequence Ontology Term (eg. mRNA, polypeptide)" key="soterm" />,
                            ]
                        },
                        {
                            fields: [
                                <InputComponent type="number" label="cpu" placeholder="1" value={cpu} onValueChange={setCpu} textOnHover="Number of threads" key="cpu" />,
                            ]
                        },
                    ]} />
                <ButtonComponent text="Confirmar" onPress={handleSubmit} />
            </div>
        </>
    )
}