import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";

import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";

export default function AvatarComponent(props) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-4">
      <Dropdown
        isDisabled={props.isDisabled}
        placement="bottom-start"
        className="max-w-xs"
      >
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
            <p className="break-words">
              Conectado como{" "}
              <span className="font-bold ">
                {props.username}
                Luiz Henrique do Nascimento Silva
              </span>
            </p>
          </DropdownItem>
          <DropdownItem key="perfil">Perfil</DropdownItem>
          <DropdownItem showDivider key="configurações">
            Configurações
          </DropdownItem>
          <DropdownItem
            key="sair"
            color="danger"
            onPress={() => {
              navigate("/login");
              logoutUser();
            }}
          >
            Sair
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
