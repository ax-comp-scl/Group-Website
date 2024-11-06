import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";

export default function AvatarComponent(props) {
  return (
    <div className="flex items-center gap-4">
      <Dropdown isDisabled={props.isDisabled} placement="bottom-start">
        <DropdownTrigger>
          <Avatar
            size={props.size}
            isBordered
            as="button"
            className="transition-transform"
            // name={props.letterName}
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          disabledKeys={["user"]}
        >
          <DropdownItem key="user">
            <p>
              Conectado como{" "}
              <span className="font-bold">{props.username}User</span>
            </p>
          </DropdownItem>
          <DropdownItem key="perfil">Perfil</DropdownItem>
          <DropdownItem showDivider key="configurações">
            Configurações
          </DropdownItem>
          <DropdownItem key="sair" color="danger">
            Sair
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
