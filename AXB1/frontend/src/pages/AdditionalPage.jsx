import MDropzone from "../components/adm/Dropzone"
import DropdownLegal from "../components/adm/DropdownLegal"

export default function AdditionalPage(){
    return(
        <>
            <div className="flex flex-col h-screen">
                <MDropzone/>
                <DropdownLegal/>
            </div>
        </>
    )
}