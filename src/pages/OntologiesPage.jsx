import Dropzone from "../components/adm/Dropzone";
import InputComponent from "../components/adm/Input";
import ButtonComponent from "../components/adm/Button";
import { useState, useContext } from "react";
import { FormsContext } from "../FormsContext";
import { Link } from "@nextui-org/react";

export default function OntologiesPage() {
  const { handleFormChange, formData } = useContext(FormsContext);
  const [cpu, setCpu] = useState(formData.ontology.cpu | 1);

  const validateOntologyFile = (file) => {
    const regex = /\.(obo)$/i;
    return regex.test(file.name)
      ? null
      : {
          code: "file-invalid-type",
          message:
            "Tipo de arquivo inválido. Somente arquivos .obo são permitidos.",
        };
  };

  const handleSubmit = () => {
    const ontologyData = { cpu };
    formData["ontology"] = ontologyData;
    handleFormChange(formData);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-10">
        <Dropzone
          validator={validateOntologyFile}
          label="Relation Ontology"
          textOnHover={
            <div className="px-1 py-2">
                <div className="text-small font-bold">FILE ro.obo</div>
                <div className="text-tiny">Available at <Link
                isExternal
                underline="hover"
                size="sm"
                href="https://github.com/oborel/obo-relations"
              >
                https://github.com/oborel/obo-relations
              </Link></div>
            </div>
          }
        />
        <Dropzone
          validator={validateOntologyFile}
          label="Sequence Ontology"
          textOnHover={
            <div className="px-1 py-2">
                <div className="text-small font-bold">FILE so.obo</div>
                  <div className="text-tiny">Available at <Link
                  isExternal
                  underline="hover"
                  size="sm"
                  href="https://github.com/The-Sequence-Ontology/SO-Ontologies"
                >
                  https://github.com/The-Sequence-Ontology/SO-Ontologies
                </Link>
              </div>
          </div>
          }
        />
        <Dropzone 
          validator={validateOntologyFile} 
          label="Gene Ontology"
          textOnHover={
            <div className="px-1 py-2">
                <div className="text-small font-bold">FILE go.obo</div>
                  <div className="text-tiny">Available at <Link
                  isExternal
                  underline="hover"
                  size="sm"
                  href="http://current.geneontology.org/ontology/"
                >
                  http://current.geneontology.org/ontology/
                </Link>
              </div>
          </div>
          } />
        <div className="w-7/12">
          <InputComponent
            type="number"
            label="cpu"
            value={cpu}
            onValueChange={setCpu}
            textOnHover="Number of threads"
          />
        </div>
        <ButtonComponent text="Confirmar" onPress={handleSubmit} />
      </div>
    </>
  );
}
