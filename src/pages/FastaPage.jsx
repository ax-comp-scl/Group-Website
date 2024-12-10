import Dropzone from "../components/Dropzone"
import InputComponent from "../components/Input"
import CheckboxComponent from "../components/Checkbox"
import SelectComponent from "../components/Select"
import ButtonComponent from "../components/Button"
import AccordionComponent from "../components/Accordion"
import { useState, useContext, useEffect } from "react"
import { FormsContext } from "../FormsContext"
import { postData, getData } from "../services/RequestsService"
import SelectOrganisms from "../components/SelectOrganisms"

export default function FastaPage() {
  const { handleFormChange, formData } = useContext(FormsContext)

  const [organism, setOrganism] = useState(formData.fasta.organism)
  const [soterm, setSoterm] = useState(formData.fasta.soterm)
  const [description, setDescription] = useState(formData.fasta.description)
  const [url, setUrl] = useState(formData.fasta.url)
  const [doi, setDoi] = useState(formData.fasta.doi)
  const [nosequence, setNosequence] = useState(formData.fasta.nosequence)
  const [cpu, setCpu] = useState(formData.fasta.cpu | 1)
  const [fastaFiles, setFastaFiles] = useState([]);

  const validateFastaFile = (file) => {
    const regex = /\.(fasta|fa|fna|faa)$/i
    return regex.test(file.name) ? null : {
      code: "file-invalid-type",
      message: "Tipo de arquivo inválido. Somente arquivos .fasta, .fa, .fna ou .faa são permitidos."
    }
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem("authToken");

    const config = {
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "multipart/form-data"
      }
    }

    const formData = new FormData()

    // formData.append('file', relationOntologyFiles[0])

    // const response = await postData("api/ontology/insert",
    //   formData,
    //   config)

  };

  useEffect(() => {
    const fastaData = {
      organism,
      soterm,
      description,
      url,
      doi,
      nosequence,
      cpu
    }
    formData["fasta"] = fastaData
    handleFormChange(formData)
  }, [organism, soterm, description, url, doi, nosequence, cpu])

  const sotermOptions = [
    "SOTERM 1",
    "SOTERM 2",
    "SOTERM 3",
    "SOTERM 4",
  ]

  const doiOptions = [
    "DOI 1",
    "DOI 2",
    "DOI 3",
    "DOI 4",
  ]
  
  return (
    <>
      <div className="flex flex-col gap-10 items-center">
        <Dropzone
          accept={{ "*/*": [".fasta", ".fa", ".fna", ".faa"] }}
          validator={validateFastaFile}
          files={fastaFiles}
          setFiles={setFastaFiles}
          label="FASTA File"
          textOnHover={<p className="text-small font-bold px-1 py-2">FASTA File</p>}
        />
        <AccordionComponent
          itens={[
            {
              isRequired: true,
              fields: [
                <SelectOrganisms
                  setValue={setOrganism}
                  key="organism"
                />,
                <SelectComponent
                  isRequired={true}
                  options={sotermOptions}
                  defaultSelectedKeys={soterm}
                  label="soterm"
                  setValue={setSoterm}
                  textOnHover="SO Sequence Ontology Term (eg. chromosome, assembly)"
                  key="soterm"
                />,
              ],
            },
            {
              fields: [
                <InputComponent
                  label="description"
                  type="text"
                  value={description}
                  onValueChange={setDescription}
                  textOnHover="Description"
                  key="description"
                />,
                <InputComponent
                  label="url"
                  type="text"
                  value={url}
                  onValueChange={setUrl}
                  textOnHover="URL"
                  key="url"
                />,
                <SelectComponent
                  options={doiOptions}
                  label="doi"
                  setValue={setDoi}
                  textOnHover="DOI of the article reference to this sequence. E.g.: 10.1111/s12122-012-1313-4"
                  key="doi"
                />,
                <InputComponent
                  type="number"
                  label="cpu"
                  placeholder="1"
                  value={cpu}
                  onValueChange={setCpu}
                  textOnHover="Number of threads"
                  key="cpu"
                />,
                <CheckboxComponent
                  name="nosequence"
                  isSelected={nosequence}
                  onValueChange={setNosequence}
                  textOnHover="Don't load the sequence"
                  key="nosequence"
                />,
              ],
            },
          ]}
        />
        <ButtonComponent text="Confirmar" onPress={handleSubmit} />
      </div>
    </>
  );
}