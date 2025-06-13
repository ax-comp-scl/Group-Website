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
  const [tbiFiles, setTbiFiles] = useState([])

  const validateGFFFile = file => {
    const regex = /\.(gz)$/i
    return regex.test(file.name)
      ? null
      : {
        code: 'file-invalid-type',
        message:
          'Tipo de arquivo inválido. Somente arquivos .gz são permitidos para o GFF.',
      }
  }

  const validateTBIFile = file => {
    const regex = /\.(tbi)$/i
    return regex.test(file.name)
      ? null
      : {
        code: 'file-invalid-type',
        message:
          'Tipo de arquivo inválido. Somente arquivos .tbi são permitidos.',
      }
  }

  const handleSubmit = async () => {
    if (!gffFiles.length) {
      toast.error('O arquivo GFF (.gz) é obrigatório.')
      return
    }
    if (!tbiFiles.length) {
      toast.error('O arquivo de índice TBI (.tbi) é obrigatório.')
      return
    }

    const gffFile = gffFiles[0]
    const tbiFile = tbiFiles[0]

    if (validateGFFFile(gffFile)) {
      toast.error(validateGFFFile(gffFile).message)
      return
    }
    if (validateTBIFile(tbiFile)) {
      toast.error(validateTBIFile(tbiFile).message)
      return
    }

    const submissionData = new FormData()

    submissionData.append('gffFile', gffFile)
    submissionData.append('tbiFile', tbiFile)

    const organismValue = Array.from(organism)[0]
    submissionData.append('organism', organismValue)
    submissionData.append('doi', doi)
    submissionData.append('ignore', ignore)
    submissionData.append('qtl', qtl)
    submissionData.append('cpu', cpu)

    try {
      const response = await postFile('api/load/gff', submissionData)
      toast.success('Arquivos GFF e TBI enviados com sucesso!')
      
      setGffFiles([])
      setTbiFiles([])
    } catch (error) {
      console.error('Erro ao enviar arquivos:', error)
      toast.error(
        error.response?.data?.message ||
          'Ocorreu um erro inesperado ao enviar os arquivos.'
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
        <div className="flex flex-col items-center gap-10 w-full">
          <Dropzone
            validator={validateGFFFile}
            files={gffFiles}
            setFiles={setGffFiles}
            label="GFF File"
            textOnHover={
              <div className="px-1 py-2">
                <div className="text-small font-bold">GFF (.gz)</div>
                <div className="text-tiny">
                  <p>
                    GFF3 file compressed (.gz) and index using tabix. (
                    <Link
                      isExternal
                      size="sm"
                      underline="hover"
                      color="#66aaf9"
                      href="http://www.htslib.org/doc/tabix.html"
                    >
                      htslib.org/doc/tabix
                    </Link>
                    )
                  </p>
                </div>
              </div>
            }
          />
          <Dropzone
            validator={validateTBIFile}
            files={tbiFiles}
            setFiles={setTbiFiles}
            label="TBI File"
            textOnHover={
              <div className="px-1 py-2">
                <div className="text-small font-bold">TBI (.tbi)</div>
                <div className="text-tiny">
                  <p>
                    Tabix Index file (.tbi) corresponding to the GFF file.
                  </p>
                </div>
              </div>
            }
          />
        </div>

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