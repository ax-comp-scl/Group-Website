import {Checkbox} from "@nextui-org/react"

export default function CheckboxComponent(props){
  return (
      <Checkbox size="md">{props.name}</Checkbox>
    )
}