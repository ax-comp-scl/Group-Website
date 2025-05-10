import { useContext, useEffect, useState } from 'react'
import { FormsContext } from '../FormsContext'
import AccordionComponent from '../components/Accordion'
import ButtonComponent from '../components/Button'
import Dropzone from '../components/Dropzone'
import InputComponent from '../components/Input'
import SelectComponent from '../components/Select'
import { postData } from '../services/RequestsService'

export default function SimilarityPage() {
  const { handleFormChange, formData } = useContext(FormsContext)

  const [format, setFormat] = useState(formData.similarity.format)
  const [soquery, setSoquery] = useState(formData.similarity.soquery)
  const [sosubject, setSosubject] = useState(formData.similarity.sosubject)
  const [organismquery, setOrganismquery] = useState(
    formData.similarity.organismquery
  )
  const [organismsubject, setOrganismsubject] = useState(
    formData.similarity.organismsubject
  )
  const [program, setProgram] = useState(formData.similarity.program)
  const [programversion, setProgramversion] = useState(
    formData.similarity.programversion
  )
  const [name, setName] = useState(formData.similarity.name)
  const [algorithm, setAlgorithm] = useState(formData.similarity.algorithm)
  const [description, setDescription] = useState(
    formData.similarity.description
  )
  const [cpu, setCpu] = useState(formData.similarity.cpu | 1)
  const [similarityFiles, setSimilarityFiles] = useState([])

  const handleSubmit = async () => {
    const token = localStorage.getItem('authToken')

    const config = {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    }

    const formData = new FormData()

    // formData.append('file', relationOntologyFiles[0])

    // const response = await postData("api/ontology/insert",
    //   formData,
    //   config)
  }

  useEffect(() => {
    const similarityData = {
      format,
      soquery,
      sosubject,
      organismquery,
      organismsubject,
      program,
      programversion,
      name,
      algorithm,
      description,
      cpu,
    }
    formData.similarity = similarityData
    handleFormChange(formData)
  }, [
    format,
    soquery,
    sosubject,
    organismquery,
    organismsubject,
    program,
    programversion,
    name,
    algorithm,
    description,
    cpu,
    formData,
    handleFormChange,
  ])

  const fileOptions = ['blast-xml', 'interproscan-xml']

  const soQueryOptions = [
    'SO query 1',
    'SO query 2',
    'SO query 3',
    'SO query 4',
  ]

  const soSubjectOptions = [
    'SO subject 1',
    'SO subject 2',
    'SO subject 3',
    'SO subject 4',
  ]

  const organismQueryOptions = [
    'Organism query 1',
    'Organism query 2',
    'Organism query 3',
    'Organism query 4',
  ]

  const organismSubjectOptions = [
    'Organism subject 1',
    'Organism subject 2',
    'Organism subject 3',
    'Organism subject 4',
  ]

  return (
    <>
      <div className="flex flex-col items-center gap-10">
        <Dropzone
          files={similarityFiles}
          setFiles={setSimilarityFiles}
          label="Arquivo de similaridade"
          textOnHover={
            <p className="text-small font-bold px-1 py-2">
              Blast or InterproScan XML file
            </p>
          }
        />
        <div className="w-7/12">
          <SelectComponent
            options={fileOptions}
            label="format"
            className="w-3/12"
            setValue={setFormat}
            textOnHover="blast-xml or interproscan-xml"
            isRequired={true}
          />
        </div>
        <AccordionComponent
          itens={[
            {
              isRequired: true,
              fields: [
                <SelectComponent
                  options={soQueryOptions}
                  defaultSelectedKeys={soquery}
                  label="so_query"
                  setValue={setSoquery}
                  textOnHover="Query Sequence Ontology term. eg. assembly, mRNA, CDS, polypeptide"
                  isRequired={true}
                  key="so-query"
                />,
                <SelectComponent
                  options={soSubjectOptions}
                  defaultSelectedKeys={sosubject}
                  label="so_subject"
                  setValue={setSosubject}
                  textOnHover="Subject Sequence Ontology term. eg. assembly, mRNA, CDS, polypeptide (protein_match if loading InterproScan or BLAST xml file)"
                  isRequired={true}
                  key="so-subject"
                />,
                <SelectComponent
                  options={organismQueryOptions}
                  defaultSelectedKeys={organismquery}
                  label="organism_query"
                  setValue={setOrganismquery}
                  textOnHover="Query's organism name. eg. 'Oryza sativa'. Cannot be multispecies'"
                  isRequired={true}
                  key="organism-query"
                />,
                <SelectComponent
                  options={organismSubjectOptions}
                  defaultSelectedKeys={organismsubject}
                  label="organism_subject"
                  setValue={setOrganismsubject}
                  textOnHover="Subject's organism name eg. 'Oryza sativa'. If using a multispecies database put  'multispecies multispecies'"
                  isRequired={true}
                  key="organism-subject"
                />,
                <InputComponent
                  label="program"
                  type="text"
                  value={program}
                  onValueChange={setProgram}
                  isRequired={true}
                  key="program"
                />,
                <InputComponent
                  label="programversion"
                  type="text"
                  value={programversion}
                  onValueChange={setProgramversion}
                  isRequired={true}
                  key="programversion"
                />,
              ],
            },
            {
              fields: [
                <InputComponent
                  label="name"
                  type="text"
                  value={name}
                  onValueChange={setName}
                  textOnHover=""
                  key="name"
                />,
                <InputComponent
                  label="algorithm"
                  type="text"
                  value={algorithm}
                  onValueChange={setAlgorithm}
                  textOnHover=""
                  key="algorithm"
                />,
                <InputComponent
                  label="description"
                  type="text"
                  value={description}
                  onValueChange={setDescription}
                  textOnHover=""
                  key="description"
                />,
                <InputComponent
                  type="number"
                  label="cpu"
                  placeholder="1"
                  value={cpu}
                  onValueChange={setCpu}
                  textOnHover=""
                  key="cpu"
                />,
              ],
            },
          ]}
        />
        <ButtonComponent text="Confirmar" onPress={handleSubmit} />
      </div>
    </>
  )
}
