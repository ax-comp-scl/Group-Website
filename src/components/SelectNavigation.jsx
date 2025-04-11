import { Select, SelectItem } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function SelectNavigation({ options, defaultSelectedKey }) {
  const navigate = useNavigate();

  const handleChange = (value) => {
    const selectedKey = value.currentKey;
    navigate(selectedKey);
  };

  return (
    <Select
      label="Selecione uma opção"
      className="max-w-xs"
      variant="bordered"
      defaultSelectedKeys={new Set([defaultSelectedKey])}
      onSelectionChange={handleChange}
      disallowEmptySelection
    >
      {options.map((o) => (
        <SelectItem key={o.key}>{o.label}</SelectItem>
      ))}
    </Select>
  );
}
