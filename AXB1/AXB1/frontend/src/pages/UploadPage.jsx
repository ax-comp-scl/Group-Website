import Header from "../components/adm/Header"
import {Tabs, Tab} from "@nextui-org/react";
import { Outlet, useNavigate } from "react-router-dom";

export default function UploadPage(){
    const navigate = useNavigate()
    const handleChange = (key) => {
        navigate(key)
    }
    return(
        <>
            <div className="flex flex-col h-screen">
                <Header defaultSelectedKeys="Carregar dados" />
                <div className="flex justify-center">
                    <Tabs key="lg" size="lg" aria-label="Tabs sizes"
                    onSelectionChange={handleChange}
                    classNames={{
                        base: "w-1/2",
                        tabList: "flex w-full flex-wrap",
                        tab: "flex-1 text-center"
                    }}>
                        <Tab key="/upload/ontologies" title="Ontologia" />
                        <Tab key="/upload/organism" title="Organismo" />
                        <Tab key="/upload/publication" title="Publicação" />
                        <Tab key="/upload/fasta" title="FASTA" />
                        <Tab key="/upload/gff" title="GFF" />
                        <Tab key="/upload/additional" title="Adicional" />
                        <Tab key="/upload/similarity" title="Similaridade" />
                    </Tabs>
                </div>
                <Outlet/>
            </div>
        </>   
    )
}
