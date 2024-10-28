import {Accordion, AccordionItem} from "@nextui-org/react";

export default function AccordionComponent(props){
    return (
        <Accordion selectionMode="multiple" variant="bordered" className="w-7/12" defaultExpandedKeys={["0"]}>
            {props.itens.map((item, index) => {
                return(
                    <AccordionItem className="font-semibold" key={`${index}`} aria-label={`Accordion ${index}`} title={item.isRequired ? "Campos obrigatórios" : "Campos opcionais"}>
                        <div className="gap-10 p-4 grid grid-cols-3 items-center">{item.fields}</div>
                    </AccordionItem>
                    )
                })}
        </Accordion>
    )
}
