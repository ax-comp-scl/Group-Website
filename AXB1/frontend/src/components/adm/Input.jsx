import {Input} from "@nextui-org/react";

export default function InputComponent(props){    
  return(
      <Input
        isRequired={props.isRequired}
        variant={props.variant}
        type={props.type}
        label={props.label}
        className="max-w-xs"
        value={props.value}
        endContent={props.endContent}
        startContent={props.startContent}
        onChange={props.onChange}
        onValueChange={props.onValueChange}
        placeholder={props.placeholder}
        isClearable={props.isClearable}
      />
    )
}