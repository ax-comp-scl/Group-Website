import { Link } from '@nextui-org/react'
import { useContext, useEffect, useState } from 'react'
import { FormsContext } from '../FormsContext'
import ButtonComponent from '../components/Button'
import Dropzone from '../components/Dropzone'
import InputComponent from '../components/Input'
import { postFile } from '../services/RequestsService'
import { toast } from 'react-hot-toast'

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

  const uploadRelationOntology = async () => {
    const file = relationOntologyFiles[0]
    const validationError = validateOntologyFile(file)

    try {
      const response = await postFile('api/load/relations_ontology', file)
      toast.success('Relation ontology file uploaded successfully')
      setRelationOntologyFiles([])
    } catch (error) {
      console.error('Error uploading relation ontology file:', error)
      toast.error(
        error.response?.data?.message || 'An unexpected error occurred while uploading the Relation Ontology File.'
      )
    }
  }

  const uploadSequenceOntologyFile = async () => {
    const file = sequenceOntologyFiles[0]
    const validationError = validateOntologyFile(file)

    try {
      const response = await postFile('api/load/sequence_ontology', file)
      toast.success('Sequence ontology file uploaded successfully')
      setSequenceOntologyFiles([])
    } catch (error) {
      console.error('Error uploading sequence ontology file:', error)
      toast.error(
        error.response?.data?.message || 'An unexpected error occurred while uploading the Sequence Ontology File.'
      )
    }
  }

  const uploadGeneOntologyFile = async () => {
    const file = geneOntologyFiles[0]
    const validationError = validateOntologyFile(file)

    try {
      const response = await postFile('api/load/gene_ontology', file)
      toast.success('Gene ontology file uploaded successfully')
      setGeneOntologyFiles([])
    } catch (error) {
      console.error('Error uploading gene ontology file:', error)
      toast.error(
        error.response?.data?.message || 'An unexpected error occurred while uploading the Gene Ontology File.'
      )
    }
  }

  const handleSubmit = async () => {
    if (!relationOntologyFiles.length && !sequenceOntologyFiles.length && !geneOntologyFiles.length) {
      toast.error('Nenhum arquivo encontrado, tente novamente.')
      return
    }

    if (relationOntologyFiles.length) {
      await uploadRelationOntology();
    }

    if (sequenceOntologyFiles.length) {
      await uploadSequenceOntologyFile();
    }

    if (geneOntologyFiles.length) {
      await uploadGeneOntologyFile();
    }
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
