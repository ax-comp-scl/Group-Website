import Header from "../components/adm/Header"
import { Divider } from "@nextui-org/react"

export default function HistoryPage(){
    return(
        <>
            <div className="flex flex-col h-screen">
                <Header defaultSelectedKeys="Histórico" />
                <div className="flex-1 flex-col gap-10">
                    <div className="flex justify-end gap-44 px-32">
                        <p>filter</p>
                        <p>filter</p>
                        <p>filter</p>
                    </div>
                    <Divider></Divider>
                <div className="px-10 flex-1 flex flex-wrap gap-5">
                    
                </div>
            </div>
            </div>
        </>   
    )
}