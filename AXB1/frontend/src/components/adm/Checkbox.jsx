import {Checkbox, Tooltip} from "@nextui-org/react"

export default function CheckboxComponent(props){
  const checkboxComponent = (
    <Checkbox 
      isSelected={props.isSelected}
      onValueChange={props.onValueChange}
      color="default" 
      size="md"
      className="font-normal">{props.name}</Checkbox>
  )
  return (
    props.textOnHover ? (
      <Tooltip content={props.textOnHover} placement="top-start" offset={30} delay={800}>
        {checkboxComponent}
      </Tooltip>
    ) : (
      checkboxComponent
    )
  )
}