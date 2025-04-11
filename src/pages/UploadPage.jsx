import Header from "../components/Header";
import SelectNavigation from "../components/SelectNavigation";
import { Outlet, useLocation } from "react-router-dom";

export default function UploadPage() {
  const location = useLocation();

  const options = [
    { key: "/admin/upload/ontologies", label: "Ontologia" },
    { key: "/admin/upload/organism", label: "Organismo" },
    { key: "/admin/upload/publication", label: "Publicação" },
    { key: "/admin/upload/fasta", label: "FASTA" },
    { key: "/admin/upload/gff", label: "GFF" },
    { key: "/admin/upload/additional", label: "Adicional" },
    { key: "/admin/upload/similarity", label: "Similaridade" },
  ];

  return (
    <div className="flex flex-col mb-12">
      <Header />
      <div className="flex justify-center my-8">
        <SelectNavigation
          options={options}
          defaultSelectedKey={location.pathname}
        />
      </div>
      <Outlet />
    </div>
  );
}
