import MDropzone from "../components/adm/Dropzone"
import InputComponent from "../components/adm/Input"
import CheckboxComponent from "../components/adm/Checkbox"
import DropdownComponent from "../components/adm/Dropdown"
import ButtonComponent from "../components/adm/Button"
import AccordionComponent from "../components/adm/Accordion"

export default function GFFPage(){
    const organismsOptions = [
        "Organismo 1",
        "Organismo 2",
        "Organismo 3",
        "Organismo 4",
    ]

    const doiOptions = [
        "DOI 1",
        "DOI 2",
        "DOI 3",
        "DOI 4",
    ]

    return(
        <>
            <div className="flex flex-col h-screen">
                <MDropzone/>
                <AccordionComponent 
                className="w-7/12"
                itens ={[
                    {
                        isRequired: true,
                        fields: [
                            <DropdownComponent options={organismsOptions}/>,
                        ]
                    },
                    {
                        fields: [
                            <DropdownComponent options={doiOptions}/>,
                            <InputComponent label="Ignore" type="text"/>,
                            <InputComponent type="number" label="CPU" placeholder="0"/>,
                            <CheckboxComponent name="QTL"/>
                        ]
                    },
                ]}/>
                <ButtonComponent text="Confirmar"/>
            </div>
        </>
    )
}