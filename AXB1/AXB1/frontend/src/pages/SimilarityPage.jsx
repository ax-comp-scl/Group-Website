import MDropzone from "../components/adm/Dropzone"
import InputComponent from "../components/adm/Input"
import DropdownComponent from "../components/adm/Dropdown"
import ButtonComponent from "../components/adm/Button"
import AccordionComponent from "../components/adm/Accordion"

export default function SimilarityPage(){
    const fileOptions = [
        "blast-xml",
        "interproscan-xml",
    ]

    const soQueryOptions = [
        "SO query 1",
        "SO query 2",
        "SO query 3",
        "SO query 4",
    ]

    const soSubjectOptions = [
        "SO subject 1",
        "SO subject 2",
        "SO subject 3",
        "SO subject 4",
    ]

    const organismQueryOptions = [
        "Organism query 1",
        "Organism query 2",
        "Organism query 3",
        "Organism query 4",
    ]

    const organismSubjectOptions = [
        "Organism subject 1",
        "Organism subject 2",
        "Organism subject 3",
        "Organism subject 4",
    ]

    return(
        <>
            <div className="flex flex-col h-screen">
                <MDropzone label="Arquivo de similaridade"/>
                <DropdownComponent options={fileOptions}/>
                <AccordionComponent 
                className="w-7/12"
                itens ={[
                    {
                        isRequired: true,
                        fields: [
                            <DropdownComponent options={soQueryOptions}/>,
                            <DropdownComponent options={soSubjectOptions}/>,
                            <DropdownComponent options={organismQueryOptions}/>,
                            <DropdownComponent options={organismSubjectOptions}/>,
                            <InputComponent label="Program" type="text"/>,
                            <InputComponent label="Program version" type="text"/>,
                        ]
                    },
                    {
                        fields: [
                            <InputComponent label="Name" type="text"/>,
                            <InputComponent label="Algorithm" type="text"/>,
                            <InputComponent label="Description" type="text"/>,
                            <InputComponent type="number" label="CPU" placeholder="0"/>,
                        ]
                    },
                ]}/>
                <ButtonComponent text="Confirmar"/>
            </div>
        </>
    )
}