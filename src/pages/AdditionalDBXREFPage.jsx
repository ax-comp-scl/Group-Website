import InputComponent from "../components/Input"
import ButtonComponent from "../components/Button"
import SelectComponent from "../components/Select"
import AccordionComponent from "../components/Accordion"
import { useOutletContext } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import CheckboxComponent from "../components/Checkbox"
import { FormsContext } from "../FormsContext"
import { postData } from "../services/RequestsService"
import SelectOrganisms from "../components/SelectOrganisms"

export default function AdditionalDBXREFPage() {
    const { setLabel, setHover } = useOutletContext()
    const { handleFormChange, formData } = useContext(FormsContext)
    useEffect(() => {
        setHover("Two-column tab separated file. (feature.dbxref\\tdb:dbxref)")
        setLabel("DBxRef")
    }, [])

    const [organism, setOrganism] = useState(formData.additional.dbxref.organism)
    const [soterm, setSoterm] = useState(formData.additional.dbxref.soterm)
    const [cpu, setCpu] = useState(formData.additional.dbxref.cpu | 1)
    const [ignorenotfound, setIgnorenotfound] = useState(formData.additional.dbxref.ignorenotfound)

    const handleSubmit = async () => {
        //await postData("", {})
    }

    useEffect(() => {
        const dbxrefData = {
            organism,
            soterm,
            ignorenotfound,
            cpu
        }
        formData["additional"]["dbxref"] = dbxrefData
        handleFormChange(formData)
    }, [organism, soterm, ignorenotfound, cpu])


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
                                <SelectOrganisms setValue={setOrganism} key="organism"/>,
                                <SelectComponent isRequired={true} options={sotermOptions} defaultSelectedKeys={soterm} label="soterm" setValue={setSoterm} textOnHover="SO Sequence Ontology Term (eg. mRNA, polypeptide)" key="soterm" />,
                            ]
                        },
                        {
                            fields: [
                                <InputComponent type="number" label="cpu" placeholder="1" value={cpu} onValueChange={setCpu} textOnHover="Number of threads" key="cpu" />,
                                <CheckboxComponent name="ignorenotfound" isSelected={ignorenotfound} onValueChange={setIgnorenotfound} textOnHover="Don't raise error and exit if feature not found" key="ignorenotfound" />
                            ]
                        },
                    ]} />
                <ButtonComponent text="Confirmar" onPress={handleSubmit} />
            </div>
        </>
    )
}