import {Select, SelectItem} from "@nextui-org/react";

export default function SelectComponent(props) {
  return (
      <Select 
        label="Selecione uma opção" 
        className="max-w-xs" 
        isRequired={props.isRequired}
        variant={props.variant}
        onChange={(value) => {
          const selectedValue = value.target.value
          props.onChange(selectedValue);
        }}
        defaultSelectedKeys={new Set([props.defaultSelectedKeys])}
      >
        {props.options.map((o, i) => (
          <SelectItem 
            value={o}
            key={o}> 
            {o}
          </SelectItem>
        ))}
      </Select>
  );
}