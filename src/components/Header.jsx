import embrapa from "../assets/logo-embrapa.png";
import SelectNavigation from "./SelectNavigation";
import AvatarComponent from "./Avatar";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Divider } from "@nextui-org/divider";
import { getUser } from "../services/userService";
import Navbar from "./Navbar";
import { Tab } from "@nextui-org/react";

export default function Header(props) {
  const user = getUser()

  const admOptions = [
    { key: "/admin/history", title: "Histórico" },
    { key: "/admin/create-user", title: "Criar usuário" },
    { key: "/admin/users", title: "Listar usuários" },
    { key: "/admin/upload/ontologies", title: "Carregar dados" },
    { key: "/organisms", title: "Listar dados" },
  ];

  const userOptions = [
    { key: "/organisms", title: "Listar dados" },
  ];

  const tabOptions = (user.is_staff ? admOptions : userOptions).map((tab) => (
    <Tab key={tab.key} title={tab.title} />
  ));

  return (
    <div className="sticky top-0 bg-white/50 backdrop-blur-sm z-50">
      <div className="navbar px-12 py-4 gap-4 ">
        <div className="flex-1">
          <div className="hidden md:block w-40">
            <Link to={"/admin/history"}><img src={embrapa} alt="Logo da Embrapa" /></Link>
          </div>
        </div>
        
        <Navbar
          options={tabOptions}
          base="w-full max-w-2xl"
        />

        <AvatarComponent size="lg" />
      </div>
      <Divider />
    </div>
  );
}
