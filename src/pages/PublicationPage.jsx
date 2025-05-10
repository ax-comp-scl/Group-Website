import { useContext, useEffect, useState } from 'react'
import { FormsContext } from '../FormsContext'
import ButtonComponent from '../components/Button'
import Dropzone from '../components/Dropzone'
import InputComponent from '../components/Input'
import { postData } from '../services/RequestsService'

export default function PublicationPage() {
  const [publicationFiles, setPublicationFiles] = useState([])

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

  const { handleFormChange, formData } = useContext(FormsContext)

  const [cpu, setCpu] = useState(formData.publication.cpu | 1)

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
