import { Select, SelectItem } from "@nextui-org/react";
import StatusIcon from "./icons/StatusIcon";
import InsertIcon from "./icons/InsertIcon";
import ExcludeIcon from "./icons/ExcludeIcon";
import { useState } from "react";

export default function StatusFilter(props) {
  const items = [
    {
      value: "insercao",
      status: "Inserção",
      icon: <ExcludeIcon className="size-5" />,
    },
    {
      value: "delecao",
      status: "Deleção",
      icon: <InsertIcon className="size-5" />,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Select
      radius="full"
      label={
        <div className="flex items-center">
          Status {<StatusIcon size={isOpen || props.value ? 4 : 6} />}
        </div>
      }
      labelPlacement="inside"
      items={items}
      variant="bordered"
      className="max-w-40"
      onSelectionChange={props.setValue}
      onOpenChange={(open) => open !== isOpen && setIsOpen(open)}
      renderValue={(selected) => {
        return selected.map((s) => (
          <div key={s.data.icon} className="flex items-center gap-2">
            <span>{s.data.status}</span>
            <span className="text-default-500 text-tiny">{s.data.icon}</span>
          </div>
        ));
      }}
    >
      {(item) => (
        <SelectItem key={item.status} value={item}>
          <div key={item.status} className="flex items-center gap-2">
            <div className="flex gap-2 items-center">
              <span>{item.status}</span>
              <span>{item.icon}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
