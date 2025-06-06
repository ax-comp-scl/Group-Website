import { useContext, useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { FormsContext } from '../FormsContext'
import AccordionComponent from '../components/Accordion'
import ButtonComponent from '../components/Button'
import InputComponent from '../components/Input'
import SelectOrganisms from '../components/SelectOrganisms'
import { postFile } from '../services/RequestsService'

export default function AdditionalSequencePage() {
  const { setLabel, setHover, additionalFiles, setAdditionalFiles } = useOutletContext()
  const { handleFormChange, formData } = useContext(FormsContext)

  useEffect(() => {
    setHover('Arquivo FASTA')
    setLabel('sequência')
  }, [setHover, setLabel])

  const [organism, setOrganism] = useState(
    formData.additional.sequence.organism || ''
  )
  const [soterm, setSoterm] = useState(formData.additional.sequence.soterm || '')
  const [cpu, setCpu] = useState(formData.additional.sequence.cpu || 1)

  const validateFastaFile = file => {
    const regex = /\.(fasta|fa|fna|faa)$/i
    return regex.test(file.name)
      ? null
      : {
          code: 'file-invalid-type',
          message:
            'Tipo de arquivo inválido. Somente arquivos FASTA (.fasta, .fa, .fna, .faa) são permitidos.',
        }
  }

  const handleSubmit = async () => {
    if (!additionalFiles.length) {
      toast.error('Nenhum arquivo FASTA encontrado, tente novamente.')
      return
    }

    const file = additionalFiles[0]
    const validationError = validateFastaFile(file)

    if (validationError) {
      toast.error(validationError.message)
      return
    }

    const additionalData = {
      organism,
      soterm,
      cpu,
    }

    try {
      await postFile('api/load/feature_sequence', file, additionalData)
      toast.success('Arquivo de sequência enviado com sucesso!')
      setAdditionalFiles([])
    } catch (error) {
      console.error('Erro ao enviar arquivo de sequência:', error)
      toast.error(
        error.response?.data?.message ||
          'Ocorreu um erro inesperado ao enviar o arquivo.'
      )
    }
  }

  useEffect(() => {
    const sequenceData = {
      organism,
      soterm,
      cpu,
    }
    formData.additional.sequence = sequenceData
    handleFormChange(formData)
  }, [organism, soterm, cpu, formData, handleFormChange])

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
                  type="text"
                  isRequired={true}
                  label="soterm"
                  value={soterm}
                  onValueChange={setSoterm}
                  textOnHover="Termo da SO (Sequence Ontology) para filtrar as características (features) alvo. Ex: mRNA"
                  key="soterm"
                />,
              ],
            },
            {
              fields: [
                <InputComponent
                  type="number"
                  label="cpu"
                  placeholder="1"
                  value={cpu}
                  onValueChange={setCpu}
                  textOnHover="Número de threads"
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