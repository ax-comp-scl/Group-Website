import InputComponent from "../components/Input"
import ButtonComponent from "../components/Button"
import AccordionComponent from "../components/Accordion"
import CheckboxComponent from "../components/Checkbox"
import SelectComponent from "../components/Select"
import { useOutletContext } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { FormsContext } from "../FormsContext"
import { postData } from "../services/RequestsService"

export default function AdditionalAnnotationPage() {
    const { setLabel, setHover } = useOutletContext()
    const { handleFormChange, formData } = useContext(FormsContext)

    useEffect(() => {
        setHover("Two-column tab separated file. (feature.dbxref\\tannotation text)")
        setLabel("anotação")
    }, [])

    const [organism, setOrganism] = useState(formData.additional.annotation.organism)
    const [cvterm, setCvterm] = useState(formData.additional.annotation.cvterm)
    const [soterm, setSoterm] = useState(formData.additional.annotation.soterm)
    const [doi, setDoi] = useState(formData.additional.annotation.doi)
    const [cpu, setCpu] = useState(formData.additional.annotation.cpu | 1)
    const [ignorenotfound, setIgnorenotfound] = useState(formData.additional.annotation.ignorenotfound)

    const handleSubmit = async () => {
        await postData("", {})
    }

    useEffect(() => {
        const annotationData = {
            organism,
            cvterm,
            soterm,
            doi,
            ignorenotfound,
            cpu
        }
        formData["additional"]["annotation"] = annotationData
        handleFormChange(formData)
    }, [organism, cvterm, soterm, doi, ignorenotfound, cpu])


    const organismsOptions = [
        "Organismo 1",
        "Organismo 2",
        "Organismo 3",
        "Organismo 4",
    ]

    const cvtermOptions = [
        "CVTERM 1",
        "CVTERM 2",
        "CVTERM 3",
        "CVTERM 4",
    ]

    const sotermOptions = [
        "SOTERM 1",
        "SOTERM 2",
        "SOTERM 3",
        "SOTERM 4",
    ]

    const doiOptions = [
        "DOI 1",
        "DOI 2",
        "DOI 3",
        "DOI 4",
    ]

    return (
        <>
            <div className="w-full flex flex-col items-center gap-10">
                <AccordionComponent
                    itens={[
                        {
                            isRequired: true,
                            fields: [
                                <SelectComponent isRequired={true} options={organismsOptions} defaultSelectedKeys={organism} label="organism" setValue={setOrganism} textOnHover="Species name (eg. Homo sapiens, Mus musculus)" key="organism" />,
                                <SelectComponent isRequired={true} options={cvtermOptions} defaultSelectedKeys={cvterm} label="cvterm" setValue={setCvterm} textOnHover="SO Sequence Ontology Term (eg. mRNA, polypeptide)" key="cvterm" />,
                                <SelectComponent isRequired={true} options={sotermOptions} defaultSelectedKeys={soterm} label="soterm" setValue={setSoterm} textOnHover="cvterm.name from cv feature_property. (eg. display, note, product, alias, ontology_term, annotation)" key="soterm" />,
                            ]
                        },
                        {
                            fields: [
                                <SelectComponent options={doiOptions} label="doi" setValue={setDoi} defaultSelectedKeys={doi} textOnHover="DOI of the article reference to this sequence. E.g.: 10.1111/s12122-012-1313-4" key="doi" />,
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