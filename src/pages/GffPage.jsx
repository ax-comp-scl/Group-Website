import { Link } from '@nextui-org/react'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FormsContext } from '../FormsContext'
import AccordionComponent from '../components/Accordion'
import ButtonComponent from '../components/Button'
import CheckboxComponent from '../components/Checkbox'
import Dropzone from '../components/Dropzone'
import InputComponent from '../components/Input'
import SelectComponent from '../components/Select'
import SelectOrganisms from '../components/SelectOrganisms'
import { postFile } from '../services/RequestsService'

export default function GFFPage() {
  const { handleFormChange, formData } = useContext(FormsContext)
  const [organism, setOrganism] = useState(formData.gff.organism || '')
  const [doi, setDoi] = useState(formData.gff.doi || '')
  const [ignore, setIgnore] = useState(formData.gff.abbreviation || '')
  const [qtl, setQtl] = useState(formData.gff.qtl || false)
  const [cpu, setCpu] = useState(formData.gff.cpu || 1)
  const [gffFiles, setGffFiles] = useState([])

  const validateGFFFile = file => {
    const regex = /\.(gz)$/i
    return regex.test(file.name)
      ? null
      : {
        code: 'file-invalid-type',
        message:
          'Tipo de arquivo inválido. Somente arquivos .gz são permitidos.',
      }
  }

  const handleSubmit = async () => {
    if (!gffFiles.length) {
      toast.error('Nenhum arquivo GFF encontrado, tente novamente.')
      return
    }

    const file = gffFiles[0]
    const validationError = validateGFFFile(file)

    if (validationError) {
      toast.error(validationError.message)
      return
    }

    const organismValue = Array.from(organism)[0]

    const additionalData = {
      organism: organismValue,
      doi: doi,
      ignore: ignore,
      qtl: qtl,
      cpu: cpu,
    }

    try {
      const response = await postFile('api/load/gff', file, additionalData)
      toast.success('Arquivo GFF enviado com sucesso!')
      setGffFiles([])
    } catch (error) {
      console.error('Erro ao enviar arquivo GFF:', error)
      toast.error(
        error.response?.data?.message || 'Ocorreu um erro inesperado ao enviar o arquivo GFF.'
      )
    }
  }

  useEffect(() => {
    const gffData = {
      organism,
      doi,
      ignore,
      qtl,
      cpu,
    }
    formData.gff = gffData
    handleFormChange(formData)
  }, [organism, doi, ignore, qtl, cpu, formData, handleFormChange])

  const doiOptions = ['DOI 1', 'DOI 2', 'DOI 3', 'DOI 4']

  return (
    <>
      <div className="flex flex-col gap-10 items-center">
        <Dropzone
          validator={validateGFFFile}
          files={gffFiles}
          setFiles={setGffFiles}
          label="GFF File"
          textOnHover={
            <div className="px-1 py-2">
              <div className="text-small font-bold">GFF</div>
              <div className="text-tiny">
                <p>
                  GFF3 genome file indexed with tabix see (
                  <Link
                    isExternal
                    size="sm"
                    underline="hover"
                    color="#66aaf9"
                    href="http://www.htslib.org/doc/tabix.html"
                  >
                    http://www.htslib.org/doc/tabix.html
                  </Link>
                  )
                </p>
              </div>
            </div>
          }
        />
        <AccordionComponent
          itens={[
            {
              isRequired: true,
              fields: [
                <SelectOrganisms setValue={setOrganism} key="organism" />,
              ],
            },
            {
              fields: [
                <SelectComponent
                  options={doiOptions}
                  defaultSelectedKeys={doi}
                  label="doi"
                  setValue={setDoi}
                  textOnHover="DOI of the article reference to this sequence. E.g.: 10.1111/s12122-012-1313-4"
                  key="doi"
                />,
                <InputComponent
                  label="Ignore"
                  type="text"
                  value={ignore}
                  onValueChange={setIgnore}
                  textOnHover="List of feature types to ignore (eg. chromosome,scaffold)"
                  key="ignore"
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
                  name="qtl"
                  isSelected={qtl}
                  onValueChange={setQtl}
                  textOnHover="Set this flag to handle GFF files from QTLDB"
                  key="qtl"
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