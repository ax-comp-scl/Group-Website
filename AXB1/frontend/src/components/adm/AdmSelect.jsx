import { Link } from "react-router-dom";

export default function AdmSelect() {
  const options = [
    {
      text: "Criar usuário",
      link: "/create-user"
    },
    {
      text: "Listar usuários",
      link: "/users"
    },
    {
      text: "Carregar dados",
      link: "/upload/ontologies"
    },
    {
      text: "Listar organismos",
      link: "/organisms"
    },
    {
      text: "Histórico",
      link: "/history"
    },
  ]

  return (
    <ul className="text-xl font-custom menu bg-white rounded-box w-64 shadow-lg">
      {options.map((o, i) => (
        <li key={i}>
          <Link to={o.link} color="">{o.text}</Link>
        </li>
      ))}
    </ul>
  );
}
