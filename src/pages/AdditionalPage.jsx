import Dropzone from "../components/Dropzone"
import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"
import { Tab } from "@nextui-org/react"
import { useState } from "react"

export default function AdditionalPage() {
    const tabs = [
        <Tab key="/admin/upload/additional/annotation" title="Annotation" />,
        <Tab key="/admin/upload/additional/sequence" title="Sequence" />,
        <Tab key="/admin/upload/additional/publication" title="Publication" />,
        <Tab key="/admin/upload/additional/dbxref" title="DBxRef" />,
    ]

    const [label, setLabel] = useState("Two-column tab separated file. (feature.dbxref\tannotation text)")
    const [hover, setHover] = useState("anotação")
    const [additionalFiles, setAdditionalFiles] = useState([]);

    return (
        <>
            <div className="flex flex-col gap-10 items-center">
                <Dropzone 
                files={additionalFiles}
                setFiles={setAdditionalFiles} 
                label={`Arquivo de ${label}`} 
                textOnHover={<p className="text-small font-bold px-1 py-2">{hover}</p>} />
                <div className="w-7/12">
                    <Navbar options={tabs} base="w-7/12 mt-10" setLabel={setLabel} />
                </div>
                <Outlet context={{ setLabel, setHover, additionalFiles }} />
            </div>
        </>
    )
}