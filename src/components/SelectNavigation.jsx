import { Select, SelectItem } from "@nextui-org/react";

export default function SelectNavigation(props) {
  return (
    <Select
      label="Selecione uma opção"
      className="max-w-xs"
      isRequired={props.isRequired}
      variant="bordered"
      onSelectionChange={(value) => {
        const selectedValue = value.currentKey;
        props.onChange(selectedValue);
      }}
      defaultSelectedKeys={new Set([props.defaultSelectedKeys])}
      disallowEmptySelection
    >
      {props.options.map((o) => (
        <SelectItem key={o}>{o}</SelectItem>
      ))}
    </Select>
  );
}
