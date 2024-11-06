import Header from "../components/adm/Header"
import Navbar from "../components/adm/Navbar"
import { Outlet } from "react-router-dom"
import { Tab } from "@nextui-org/react"

export default function UploadPage(){
    const tabs = [
        <Tab key="/upload/ontologies" title="Ontologia" />,
        <Tab key="/upload/organism" title="Organismo" />,
        <Tab key="/upload/publication" title="Publicação" />,
        <Tab key="/upload/fasta" title="FASTA" />,
        <Tab key="/upload/gff" title="GFF" />,
        <Tab key="/upload/additional" title="Adicional" />,
        <Tab key="/upload/similarity" title="Similaridade"/>
    ]

    return(
        <>
            <div className="flex flex-col mb-12">
                <Header defaultSelectedKeys="Carregar dados" />
                <div className="flex justify-center mb-14 mt-8">
                    <Navbar options={tabs} base="w-1/2"/>
                </div>
                <Outlet/>
            </div>
        </>   
    )
}
