import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import ButtonComponent from "./Button";
import React from "react";

export default function DropdownComponent(props) {
  const [selectedKeys, setSelectedKeys] = React.useState(
    new Set(["Selecione uma opção"])
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        {/* <Button variant="bordered">{selectedValue}</Button> */}
      </DropdownTrigger>
      <DropdownMenu
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={selectedKeys}
        onSelectionChange={(e) => {
          console.log(e);
        }}
      >
        <DropdownItem className="min-w-lg" key="text">
          Text
        </DropdownItem>
        <DropdownItem key="number">Number</DropdownItem>
        <DropdownItem key="date">Date</DropdownItem>
        <DropdownItem key="single_date">Single Date</DropdownItem>
        <DropdownItem key="iteration">Iteration</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
