import { useContext, useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { FormsContext } from '../FormsContext'
import AccordionComponent from '../components/Accordion'
import ButtonComponent from '../components/Button'
import CheckboxComponent from '../components/Checkbox'
import InputComponent from '../components/Input'
import SelectComponent from '../components/Select'
import SelectOrganisms from '../components/SelectOrganisms'
import { postFile } from '../services/RequestsService'

export default function AdditionalAnnotationPage() {
  const { setLabel, setHover, additionalFiles, setAdditionalFiles } = useOutletContext()
  const { handleFormChange, formData } = useContext(FormsContext)

  useEffect(() => {
    setHover(
      'Arquivo de duas colunas separado por tabulação. (feature.dbxref\\ttexto da anotação)'
    )
    setLabel('anotação')
  }, [setHover, setLabel])

  const [organism, setOrganism] = useState(
    formData.additional.annotation.organism || ''
  )
  const [cvterm, setCvterm] = useState(formData.additional.annotation.cvterm || '')
  const [soterm, setSoterm] = useState(formData.additional.annotation.soterm || '')
  const [doi, setDoi] = useState(formData.additional.annotation.doi || '')
  const [cpu, setCpu] = useState(formData.additional.annotation.cpu || 1)
  const [ignorenotfound, setIgnorenotfound] = useState(
    formData.additional.annotation.ignorenotfound || false
  )

  const validateAnnotationFile = file => {
    const regex = /\.(txt|tsv|tab)$/i
    return regex.test(file.name)
      ? null
      : {
          code: 'file-invalid-type',
          message:
            'Tipo de arquivo inválido. Somente arquivos .txt, .tsv, ou .tab são permitidos.',
        }
  }

  const handleSubmit = async () => {
    if (!additionalFiles.length) {
      toast.error('Nenhum arquivo de anotação encontrado, tente novamente.')
      return
    }

    const file = additionalFiles[0]
    const validationError = validateAnnotationFile(file)

    if (validationError) {
      toast.error(validationError.message)
      return
    }

    const additionalData = {
      organism,
      cvterm,
      soterm,
      doi,
      cpu,
      ignorenotfound,
    }

    try {
      await postFile('api/load/feature_annotation', file, additionalData)
      toast.success('Arquivo de anotação enviado com sucesso!')
      setAdditionalFiles([])
    } catch (error) {
      console.error('Erro ao enviar arquivo de anotação:', error)
      toast.error(
        error.response?.data?.message ||
          'Ocorreu um erro inesperado ao enviar o arquivo.'
      )
    }
  }

  useEffect(() => {
    const annotationData = {
      organism,
      cvterm,
      soterm,
      doi,
      ignorenotfound,
      cpu,
    }
    formData.additional.annotation = annotationData
    handleFormChange(formData)
  }, [
    organism,
    cvterm,
    soterm,
    doi,
    ignorenotfound,
    cpu,
    formData,
    handleFormChange,
  ])

  const doiOptions = ['DOI 1', 'DOI 2', 'DOI 3', 'DOI 4']

  return (
    <>
      <div className="w-full flex flex-col items-center gap-10">
        <AccordionComponent
          itens={[
            {
              isRequired: true,
              fields: [
                <SelectOrganisms
                  value={organism}
                  setValue={setOrganism}
                  key="organism"
                />,
                <InputComponent
                  isRequired={true}
                  label="cvterm"
                  value={cvterm}
                  onValueChange={setCvterm}
                  textOnHover="Termo da ontologia (eg. display, note, product, alias, ontology_term, annotation)"
                  key="cvterm"
                />,
                <InputComponent
                  isRequired={true}
                  label="soterm"
                  value={soterm}
                  onValueChange={setSoterm}
                  textOnHover="Termo da SO (Sequence Ontology) (eg. mRNA, polypeptide)"
                  key="soterm"
                />,
              ],
            },
            {
              fields: [
                <SelectComponent
                  options={doiOptions}
                  label="doi"
                  setValue={setDoi}
                  defaultSelectedKeys={doi ? [doi] : []}
                  textOnHover="DOI do artigo de referência. Ex: 10.1111/s12122-012-1313-4"
                  key="doi"
                />,
                <InputComponent
                  type="number"
                  label="cpu"
                  placeholder="1"
                  value={cpu}
                  onValueChange={setCpu}
                  textOnHover="Número de threads"
                  key="cpu"
                />,
                <CheckboxComponent
                  name="ignorenotfound"
                  isSelected={ignorenotfound}
                  onValueChange={setIgnorenotfound}
                  textOnHover="Não gerar erro e sair se a característica não for encontrada"
                  key="ignorenotfound"
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