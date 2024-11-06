import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function DropdownHistoryComponent(props) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">{props.name}</Button>
      </DropdownTrigger>
      <DropdownMenu closeOnSelect={false} aria-label="Static Actions">
        {Array.isArray(props.items) ? (
          props.items.map((item, index) => (
            <DropdownItem key={index}>{item}</DropdownItem>
          ))
        ) : (
          <DropdownItem key="single-item">{props.items}</DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
