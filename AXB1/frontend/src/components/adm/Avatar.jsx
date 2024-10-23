// import { twMerge } from "tailwind-merge";
// export default function Avatar(props){
//   const {width} = props
//   return (
//     <div tabIndex={0} className={`avatar`}>
//       <div className={twMerge("rounded-full ring-[#D9D9D9] ring-offset-base-100 rounded-full ring", width)}>
//         <img
//           alt="Tailwind CSS Navbar component"
//           src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
//       </div>
//     </div>
//   );
// }
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar} from "@nextui-org/react";

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
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat" disabledKeys={["user"]}>
          <DropdownItem key="user">
            <p>Conectado como <span className="font-bold">{props.username}User</span></p>
          </DropdownItem>
          <DropdownItem key="perfil">
            Perfil
          </DropdownItem>
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