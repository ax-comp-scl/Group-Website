import { useContext, useEffect, useState } from 'react'
import { FormsContext } from '../FormsContext'
import ButtonComponent from '../components/Button'
import Dropzone from '../components/Dropzone'
import InputComponent from '../components/Input'
import { postFile } from '../services/RequestsService'
import { toast } from 'react-hot-toast'

export default function PublicationPage() {
  const { handleFormChange, formData } = useContext(FormsContext)
  const [publicationFiles, setPublicationFiles] = useState([])
  const [cpu, setCpu] = useState(formData.publication.cpu || 1)

  const validatePublicationFile = file => {
    const regex = /\.(bib)$/i
    return regex.test(file.name)
      ? null
      : {
          code: 'file-invalid-type',
          message:
            'Tipo de arquivo inválido. Somente arquivos .bib são permitidos.',
        }
  }

  const handleSubmit = async () => {
    if (!publicationFiles.length) {
      toast.error('Nenhum arquivo encontrado, tente novamente.')
      return
    }

    const file = publicationFiles[0]
    const validationError = validatePublicationFile(file)

    if (validationError) {
      toast.error(validationError.message)
      return
    }

    try {
      const response = await postFile('api/publications/load', file)
      toast.success('Publicação enviada com sucesso!')
      setPublicationFiles([])
    } catch (error) {
      console.error('Erro ao enviar publicação:', error)
      toast.error(
        error.response?.data?.message || 'Ocorreu um erro inesperado ao enviar a publicação.'
      )
    }
  }

  useEffect(() => {
    const publicationData = { cpu }
    formData.publication = publicationData
    handleFormChange(formData)
  }, [cpu, formData, handleFormChange])

  return (
    <>
      <div className="flex flex-col items-center gap-10">
        <Dropzone
          validator={validatePublicationFile}
          files={publicationFiles}
          setFiles={setPublicationFiles}
          label="BibTeX File"
          textOnHover={
            <p className="text-small font-bold px-1 py-2">BibTeX File</p>
          }
        />
        <div className="w-7/12">
          <InputComponent
            className="font-xl"
            type="number"
            label="cpu"
            placeholder="1"
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