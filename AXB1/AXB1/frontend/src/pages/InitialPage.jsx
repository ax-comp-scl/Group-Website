import Header from "../components/adm/Header"
import AdmSelect from "../components/adm/AdmSelect"

export default function InitialPage(){
    return(
        <>
            <div className="flex flex-col h-screen">
                <Header defaultSelectedKeys="Tela inicial" />
                <div className="flex justify-evenly items-center">
                    <AdmSelect/>
                    <div>super historico</div>
                </div>
            </div>
        </>   
    )
}