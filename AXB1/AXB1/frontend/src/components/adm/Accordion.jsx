import {Accordion, AccordionItem} from "@nextui-org/react";

export default function AccordionComponent(props){
    return (
        <Accordion selectionMode="multiple" variant="bordered" className={props.className} defaultExpandedKeys={["0"]}>
            {props.itens.map((item, index) => {
                return(
                    <AccordionItem key={`${index}`} aria-label={`Accordion ${index}`} title={item.isRequired ? "Campos obrigatórios" : "Campos opcionais"}>
                        <div className="flex flex-wrap gap-10 p-4">{item.fields}</div>
                    </AccordionItem>
                    )
                })}
        </Accordion>
    )
}
