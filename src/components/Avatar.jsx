import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";

import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";
import { getUser } from "../services/userService";

export default function AvatarComponent(props) {
  const user = getUser()
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
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          disabledKeys={["user"]}
        >
          <DropdownItem showDivider key="user" textValue={`Conectado como ${user.username || ''}`}>
            <p className="break-words">
              Conectado como{" "}
              <span className="font-bold ">
                {user.username || ''}
              </span>
            </p>
          </DropdownItem>
          <DropdownItem
            key="sair"
            color="danger"
            onPress={() => {
              logoutUser()
              navigate("/login");
            }}
          >
            Sair
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
