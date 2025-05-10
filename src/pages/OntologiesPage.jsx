import { Link } from '@nextui-org/react'
import { useContext, useEffect, useState } from 'react'
import { FormsContext } from '../FormsContext'
import ButtonComponent from '../components/Button'
import Dropzone from '../components/Dropzone'
import InputComponent from '../components/Input'
import { postData } from '../services/RequestsService'

export default function OntologiesPage() {
  const { handleFormChange, formData } = useContext(FormsContext)
  const [cpu, setCpu] = useState(formData.ontology.cpu | 1)
  const [relationOntologyFiles, setRelationOntologyFiles] = useState([])
  const [sequenceOntologyFiles, setSequenceOntologyFiles] = useState([])
  const [geneOntologyFiles, setGeneOntologyFiles] = useState([])

  const validateOntologyFile = file => {
    const regex = /\.(obo)$/i
    return regex.test(file.name)
      ? null
      : {
          code: 'file-invalid-type',
          message:
            'Tipo de arquivo inválido. Somente arquivos .obo são permitidos.',
        }
  }

  //relation ontology
  const handleSubmit = async () => {
    const formData = new FormData()
    formData.append('file', relationOntologyFiles[0])

    // TODO: adicionar try catch e tratativas de erro/sucesso (toast na tela?)
    await postData('api/load/relations_ontology', formData)
  }

  useEffect(() => {
    const ontologyData = { cpu }
    formData.ontology = ontologyData
    handleFormChange(formData)
  }, [cpu, formData, handleFormChange])

  return (
    <>
      <div className="flex flex-col items-center gap-10">
        <Dropzone
          validator={validateOntologyFile}
          files={relationOntologyFiles}
          setFiles={setRelationOntologyFiles}
          label="Relation Ontology"
          textOnHover={
            <div className="px-1 py-2">
              <div className="text-small font-bold">FILE ro.obo</div>
              <div className="text-tiny">
                Available at{' '}
                <Link
                  isExternal
                  underline="hover"
                  size="sm"
                  href="https://github.com/oborel/obo-relations"
                >
                  https://github.com/oborel/obo-relations
                </Link>
              </div>
            </div>
          }
        />
        <Dropzone
          validator={validateOntologyFile}
          files={sequenceOntologyFiles}
          setFiles={setSequenceOntologyFiles}
          label="Sequence Ontology"
          textOnHover={
            <div className="px-1 py-2">
              <div className="text-small font-bold">FILE so.obo</div>
              <div className="text-tiny">
                Available at{' '}
                <Link
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
          files={geneOntologyFiles}
          setFiles={setGeneOntologyFiles}
          label="Gene Ontology"
          textOnHover={
            <div className="px-1 py-2">
              <div className="text-small font-bold">FILE go.obo</div>
              <div className="text-tiny">
                Available at{' '}
                <Link
                  isExternal
                  underline="hover"
                  size="sm"
                  href="http://current.geneontology.org/ontology/"
                >
                  http://current.geneontology.org/ontology/
                </Link>
              </div>
            </div>
          }
        />
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
  )
}
