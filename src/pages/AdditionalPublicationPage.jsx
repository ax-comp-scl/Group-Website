import { useContext, useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { FormsContext } from '../FormsContext'
import AccordionComponent from '../components/Accordion'
import ButtonComponent from '../components/Button'
import InputComponent from '../components/Input'
import SelectComponent from '../components/Select'
import SelectOrganisms from '../components/SelectOrganisms'
import { postData } from '../services/RequestsService'

export default function AdditionalPublicationPage() {
  const { setLabel, setHover } = useOutletContext()
  const { handleFormChange, formData } = useContext(FormsContext)
  useEffect(() => {
    setHover(
      'Two-column tab separated file. (feature.dbxref\\tpublication DOI)'
    )
    setLabel('publicação')
  }, [setHover, setLabel])

  const [organism, setOrganism] = useState(
    formData.additional.publication.organism
  )
  const [soterm, setSoterm] = useState(formData.additional.publication.soterm)
  const [cpu, setCpu] = useState(formData.additional.publication.cpu | 1)

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
    const publicationData = {
      organism,
      soterm,
      cpu,
    }
    formData.additional.publication = publicationData
    handleFormChange(formData)
  }, [organism, soterm, cpu, formData, handleFormChange])

  const organismsOptions = [
    'Organismo 1',
    'Organismo 2',
    'Organismo 3',
    'Organismo 4',
  ]

  const sotermOptions = ['SOTERM 1', 'SOTERM 2', 'SOTERM 3', 'SOTERM 4']

  return (
    <>
      <div className="w-full flex flex-col items-center gap-10">
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
                  type="number"
                  label="cpu"
                  placeholder="1"
                  value={cpu}
                  onValueChange={setCpu}
                  textOnHover="Number of threads"
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
