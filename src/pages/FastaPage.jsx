import { useContext, useEffect, useState } from 'react'
import { FormsContext } from '../FormsContext'
import AccordionComponent from '../components/Accordion'
import ButtonComponent from '../components/Button'
import CheckboxComponent from '../components/Checkbox'
import Dropzone from '../components/Dropzone'
import InputComponent from '../components/Input'
import SelectComponent from '../components/Select'
import SelectOrganisms from '../components/SelectOrganisms'
import { postFile } from '../services/RequestsService'
import { toast } from 'react-hot-toast'

export default function FastaPage() {
  const { handleFormChange, formData } = useContext(FormsContext)

  const [organism, setOrganism] = useState(formData.fasta.organism || '')
  const [soterm, setSoterm] = useState(formData.fasta.soterm || '')
  const [description, setDescription] = useState(formData.fasta.description || '')
  const [url, setUrl] = useState(formData.fasta.url || '')
  const [doi, setDoi] = useState(formData.fasta.doi || '')
  const [nosequence, setNosequence] = useState(formData.fasta.nosequence || false)
  const [cpu, setCpu] = useState(formData.fasta.cpu || 1)
  const [fastaFiles, setFastaFiles] = useState([])

  const validateFastaFile = file => {
    const regex = /\.(fasta|fa|fna|faa)$/i
    return regex.test(file.name)
      ? null
      : {
          code: 'file-invalid-type',
          message:
            'Tipo de arquivo inválido. Somente arquivos .fasta, .fa, .fna ou .faa são permitidos.',
        }
  }

  const handleSubmit = async () => {
    if (!fastaFiles.length) {
      toast.error('Nenhum arquivo FASTA encontrado, tente novamente.')
      return
    }

    const file = fastaFiles[0]
    const validationError = validateFastaFile(file)

    if (validationError) {
      toast.error(validationError.message)
      return
    }

    const additionalData = {
      organism: organism,
      soterm: soterm,
      description: description,
      url: url,
      doi: doi,
      nosequence: nosequence,
      cpu: cpu,
    }

    try {
      const response = await postFile('api/load/fasta', file, additionalData)
      toast.success('Arquivo FASTA enviado com sucesso!')
      setFastaFiles([])
    } catch (error) {
      console.error('Erro ao enviar arquivo FASTA:', error)
      toast.error(
        error.response?.data?.message || 'Ocorreu um erro inesperado ao enviar o arquivo FASTA.'
      )
    }
  }

  useEffect(() => {
    const fastaData = {
      organism,
      soterm,
      description,
      url,
      doi,
      nosequence,
      cpu,
    }
    formData.fasta = fastaData
    handleFormChange(formData)
  }, [
    organism,
    soterm,
    description,
    url,
    doi,
    nosequence,
    cpu,
    formData,
    handleFormChange,
  ])

  const sotermOptions = ['SOTERM 1', 'SOTERM 2', 'SOTERM 3', 'SOTERM 4']

  const doiOptions = ['DOI 1', 'DOI 2', 'DOI 3', 'DOI 4']

  return (
    <>
      <div className="flex flex-col gap-10 items-center">
        <Dropzone
          accept={{ '*/*': ['.fasta', '.fa', '.fna', '.faa'] }}
          validator={validateFastaFile}
          files={fastaFiles}
          setFiles={setFastaFiles}
          label="FASTA File"
          textOnHover={
            <p className="text-small font-bold px-1 py-2">FASTA File</p>
          }
        />
        <AccordionComponent
          itens={[
            {
              isRequired: true,
              fields: [
                <SelectOrganisms setValue={setOrganism} key="organism" />,
                <InputComponent
                  type= "text"
                  isRequired={true}
                  defaultSelectedKeys={soterm}
                  label="soterm"
                  value={soterm}
                  onValueChange={setSoterm}
                  textOnHover="cvterm.name from cv feature_property. (eg. display, note, product, alias, ontology_term, annotation)"
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
  )
}