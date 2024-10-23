// import imageURL from "./logo-embrapa-white.png";
// import SelectComponent from "./Select";
// import AvatarComponent from "./Avatar";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Header(props) {
//   const navigate = useNavigate()
//   const [selected, setSelected] = useState(props.defaultSelectedKeys)
//   const options = [
//     "Tela inicial",
//     "Criar usuário",
//     "Listar usuários",
//     "Carregar dados",
//     "Listar organismos",
//     "Histórico"
//   ]

//   useEffect(() => {
//     switch (selected) {
//       case "Tela inicial":
//         navigate("/")
//         break
//       case "Criar usuário":
//         navigate("/create-user")
//         break
//       case "Listar usuários":
//         navigate("/users")
//         break
//       case "Carregar dados":
//         navigate(`/upload/ontologies`)
//         break
//       case "Listar organismos":
//         navigate("/organisms")
//         break
//       case "Histórico":
//         navigate("/history")
//         break
//       default:
//         break
//     }
//   }, [selected])

//   return (
//     <div className="navbar bg-[#48645A] px-12 py-4 gap-4">
//       <div className="flex-1">
//         <AvatarComponent size="lg" />
//       </div>
//       <SelectComponent
//         isRequired={false}
//         options={options}
//         onChange={setSelected}
//         defaultSelectedKeys={selected}
//       />
//       <div className="hidden md:block w-40">
//         <img src={imageURL} alt="" />
//       </div>
//     </div>
//   );
// }

import imageURL from "./logo-embrapa-white.png";
import embrapa from "./logo-embrapa.png";
import SelectComponent from "./Select";
import AvatarComponent from "./Avatar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Divider} from "@nextui-org/divider";

export default function Header(props) {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(props.defaultSelectedKeys)
  const options = [
    "Tela inicial",
    "Criar usuário",
    "Listar usuários",
    "Carregar dados",
    "Listar organismos",
    "Histórico"
  ]

  useEffect(() => {
    switch (selected) {
      case "Tela inicial":
        navigate("/")
        break
      case "Criar usuário":
        navigate("/create-user")
        break
      case "Listar usuários":
        navigate("/users")
        break
      case "Carregar dados":
        navigate(`/upload/ontologies`)
        break
      case "Listar organismos":
        navigate("/organisms")
        break
      case "Histórico":
        navigate("/history")
        break
      default:
        break
    }
  }, [selected])

  return (
    <div className="sticky top-0 bg-white/50 backdrop-blur-sm z-10 mb-10">
      <div className="navbar px-12 py-4 gap-4 ">
        <div className="flex-1">
          <div className="hidden md:block w-40">
            <img src={embrapa} alt="" />
          </div>
        </div>
          <SelectComponent
            isRequired={false}
            options={options}
            onChange={setSelected}
            defaultSelectedKeys={selected}
            />
          <AvatarComponent size="lg" />
      </div>
      <Divider></Divider>
    </div>
  );
}
