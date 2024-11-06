import {Select, SelectItem} from "@nextui-org/react";
import { StatusIcon } from "./StatusIcon";
import InsertIcon from "./InsertIcon";
import ExcludeIcon from "./ExcludeIcon";

export default function StatusFilter() {
    const items = [
        {
            value: "insercao",
            status: "Inserção",
            icon: <ExcludeIcon/>,
          
        },
        {
            value: "delecao",
            status: "Deleção",
            icon: <InsertIcon/>,
        }
      ];  
  
    return (
    <Select
        radius="full"
        label={<div className="flex">Status <StatusIcon/></div>}
        labelPlacement="inside"
        items={items}
        variant="bordered"
        className="max-w-40"
        renderValue={(selected) => {
            return selected.map(s => (
                    <div key={s.data.icon} className="flex items-center gap-2">
                        <span>{s.data.status}</span>
                        <span className="text-default-500 text-tiny">{s.data.icon}</span>
                    </div>
                )
            )
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