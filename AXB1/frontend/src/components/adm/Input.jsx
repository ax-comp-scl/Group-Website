import {Input, Tooltip} from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

export default function InputComponent(props){
  const inputComponent = (<Input
            isInvalid={props.isInvalid}
            isRequired={props.isRequired}
            variant="bordered"
            type={props.type}
            label={props.label}
            classNames={{
              label: "font-normal"
            }}
            className={twMerge("max-w-xs", props.className)}
            value={props.value}
            endContent={props.endContent}
            startContent={props.startContent}
            onChange={props.onChange}
            onValueChange={props.onValueChange}
            placeholder={props.placeholder}
            isClearable={props.isClearable}
            />)
  return(
    <>
      {
        props.textOnHover ? 
        (
          <Tooltip content={props.textOnHover} placement="top-start" offset={30} delay={800}>
            {inputComponent}
          </Tooltip>
        ) : (
          inputComponent
        )
      }
    </>
  )
}