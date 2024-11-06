import Dropzone from "../components/adm/Dropzone"
import Navbar from "../components/adm/Navbar"
import { Outlet } from "react-router-dom"
import { Tab } from "@nextui-org/react"
import { useState } from "react"

export default function AdditionalPage(){
    const tabs = [
        <Tab key="/upload/additional/annotation" title="Annotation" />,
        <Tab key="/upload/additional/sequence" title="Sequence" />,
        <Tab key="/upload/additional/publication" title="Publication" />,
        <Tab key="/upload/additional/dbxref" title="DBxRef" />,
    ]

    const tooltips = [
        "Two-column tab separated file. (feature.dbxref\tannotation text)",
        "FASTA File",
        "Two-column tab separated file. (feature.dbxref\tpublication DOI)",
        "Two-column tab separated file. (feature.dbxref\tdb:dbxref)"
    ]

    const [label, setLabel] = useState("Two-column tab separated file. (feature.dbxref\tannotation text)")
    const [hover, setHover] = useState("anotação")

    return(
        <>
            <div className="flex flex-col gap-10 items-center">
                <Dropzone label={`Arquivo de ${label}`} textOnHover={<p className="text-small font-bold px-1 py-2">{hover}</p>}/>
                <div className="w-7/12">
                    <Navbar options={tabs} base="w-7/12 mt-10" setLabel={setLabel}/>
                </div>
                <Outlet context={{setLabel, setHover}} />
            </div>
        </>
    )
}