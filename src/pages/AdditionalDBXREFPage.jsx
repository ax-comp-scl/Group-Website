import InputComponent from "../components/adm/Input"
import ButtonComponent from "../components/adm/Button"
import SelectComponent from "../components/adm/Select"
import AccordionComponent from "../components/adm/Accordion"
import { useOutletContext } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import CheckboxComponent from "../components/adm/Checkbox"
import { FormsContext } from "../FormsContext"

export default function AdditionalDBXREFPage(){
    const { setLabel, setHover } = useOutletContext()
    const { handleFormChange, formData} = useContext(FormsContext)
    useEffect(() => {
        setHover("Two-column tab separated file. (feature.dbxref\\tdb:dbxref)")
        setLabel("DBxRef")
    }, [])

    const [organism, setOrganism] = useState(formData.additional.dbxref.organism)
    const [soterm, setSoterm] = useState(formData.additional.dbxref.soterm)
    const [cpu, setCpu] = useState(formData.additional.dbxref.cpu | 1)
    const [ignorenotfound, setIgnorenotfound] = useState(formData.additional.dbxref.ignorenotfound)

    const handleSubmit = () => {
        const dbxrefData = {
            organism,
            soterm,
            ignorenotfound,
            cpu
        }
        formData["additional"]["dbxref"] = dbxrefData
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
                            <SelectComponent isRequired={true} options={sotermOptions} defaultSelectedKeys={soterm} label="soterm" setValue={setSoterm} textOnHover="SO Sequence Ontology Term (eg. mRNA, polypeptide)"/>,
                        ]
                    },
                    {
                        fields: [
                            <InputComponent type="number" label="cpu" placeholder="0" value={cpu} onValueChange={setCpu} textOnHover="Number of threads"/>,
                            <CheckboxComponent name="ignorenotfound" isSelected={ignorenotfound} onValueChange={setIgnorenotfound} textOnHover="Don't raise error and exit if feature not found"/>
                        ]
                    },
                ]}/>
                <ButtonComponent text="Confirmar" onPress={handleSubmit}/>
            </div>
        </>
    )
}