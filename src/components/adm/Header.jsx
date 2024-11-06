import embrapa from "./logo-embrapa.png";
import SelectNavigation from "./SelectNavigation";
import AvatarComponent from "./Avatar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Divider } from "@nextui-org/divider";

export default function Header(props) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(props.defaultSelectedKeys);
  const options = [
    "Histórico",
    "Criar usuário",
    "Listar usuários",
    "Carregar dados",
    "Listar dados",
  ];

  useEffect(() => {
    switch (selected) {
      case "Histórico":
        navigate("/history");
        break;
      case "Criar usuário":
        navigate("/create-user");
        break;
      case "Listar usuários":
        navigate("/users");
        break;
      case "Carregar dados":
        navigate(`/upload/ontologies`);
        break;
      case "Listar dados":
        navigate("/organisms");
        break;
      default:
        break;
    }
  }, [selected]);

  return (
    <div className="sticky top-0 bg-white/50 backdrop-blur-sm z-50">
      <div className="navbar px-12 py-4 gap-4 ">
        <div className="flex-1">
          <div className="hidden md:block w-40">
            <img src={embrapa} alt="" />
          </div>
        </div>
        <SelectNavigation
          isRequired={false}
          options={options}
          onChange={setSelected}
          defaultSelectedKeys={selected}
        />
        <AvatarComponent size="lg" />
      </div>
      <Divider />
    </div>
  );
}
