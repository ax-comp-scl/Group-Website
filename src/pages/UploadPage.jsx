import Header from "../components/Header"
import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"
import { Tab } from "@nextui-org/react"

export default function UploadPage() {
    const tabs = [
        <Tab key="/admin/upload/ontologies" title="Ontologia" />,
        <Tab key="/admin/upload/organism" title="Organismo" />,
        <Tab key="/admin/upload/publication" title="Publicação" />,
        <Tab key="/admin/upload/fasta" title="FASTA" />,
        <Tab key="/admin/upload/gff" title="GFF" />,
        <Tab key="/admin/upload/additional" title="Adicional" />,
        <Tab key="/admin/upload/similarity" title="Similaridade" />
    ]

    return (
        <>
            <div className="flex flex-col mb-12">
                <Header defaultSelectedKeys="Carregar dados" />
                <div className="flex justify-center mb-14 mt-8">
                    <Navbar options={tabs} base="w-1/2" />
                </div>
                <Outlet />
            </div>
        </>
    )
}
