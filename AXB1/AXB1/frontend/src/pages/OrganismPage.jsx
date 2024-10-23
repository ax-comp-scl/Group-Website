import AccordionComponent from "../components/adm/Accordion"
import InputComponent from "../components/adm/Input"
import CheckboxComponent from "../components/adm/Checkbox"
import ButtonComponent from "../components/adm/Button"

export default function OrganismPage(){

    return(
        <>
            <div className="flex flex-col h-screen items-center mt-14 gap-10">
                <AccordionComponent 
                className="w-7/12"
                itens = {[
                    {
                        isRequired: true,
                        fields: [
                            <InputComponent label="Gênero" type="text"/>,
                            <InputComponent label="Espécie" type="text"/>,
                        ]
                    },
                    {
                        fields: [
                            <InputComponent label="Abbreviation" type="text"/>,
                            <InputComponent label="Infraspecific name" type="text"/>,
                            <InputComponent label="Comment" type="text"/>,
                            <InputComponent label="Common name" type="text"/>,
                            <CheckboxComponent name="Restrito"/>
                        ]
                    },
                ]}/>
                <ButtonComponent text="Confirmar"/>
            </div>
        </>
    )
}