import {Select, SelectItem, Tooltip} from "@nextui-org/react";

export default function SelectComponent(props) {
  const selectComponent = (<Select
              label={props.label}
              className="max-w-xs font-normal"  
              isRequired={props.isRequired}
              variant="bordered"
              onSelectionChange={props.setValue}
              defaultSelectedKeys={[props.defaultSelectedKeys]}
              isInvalid={props.isInvalid}>
              {props.options.map((o) => (
                <SelectItem key={o}>{o}</SelectItem>
              ))}
            </Select>)
  return (
    <>
      {
        props.textOnHover ? 
        (
          <Tooltip content={props.textOnHover} placement="top-start" offset={15} crossOffset={-250} delay={800}>
            {selectComponent}
          </Tooltip>
        ) : (
          selectComponent
        )
      }
    </>
  );
}