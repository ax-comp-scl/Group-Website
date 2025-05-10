import { useContext, useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { FormsContext } from '../FormsContext'
import AccordionComponent from '../components/Accordion'
import ButtonComponent from '../components/Button'
import CheckboxComponent from '../components/Checkbox'
import InputComponent from '../components/Input'
import SelectComponent from '../components/Select'
import SelectOrganisms from '../components/SelectOrganisms'
import { postData } from '../services/RequestsService'

export default function AdditionalAnnotationPage() {
  const { setLabel, setHover } = useOutletContext()
  const { handleFormChange, formData } = useContext(FormsContext)

  useEffect(() => {
    setHover(
      'Two-column tab separated file. (feature.dbxref\\tannotation text)'
    )
    setLabel('anotação')
  }, [setHover, setLabel])

  const [organism, setOrganism] = useState(
    formData.additional.annotation.organism
  )
  const [cvterm, setCvterm] = useState(formData.additional.annotation.cvterm)
  const [soterm, setSoterm] = useState(formData.additional.annotation.soterm)
  const [doi, setDoi] = useState(formData.additional.annotation.doi)
  const [cpu, setCpu] = useState(formData.additional.annotation.cpu | 1)
  const [ignorenotfound, setIgnorenotfound] = useState(
    formData.additional.annotation.ignorenotfound
  )

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

  const organismsOptions = [
    'Organismo 1',
    'Organismo 2',
    'Organismo 3',
    'Organismo 4',
  ]

  const cvtermOptions = ['CVTERM 1', 'CVTERM 2', 'CVTERM 3', 'CVTERM 4']

  const sotermOptions = ['SOTERM 1', 'SOTERM 2', 'SOTERM 3', 'SOTERM 4']

  const doiOptions = ['DOI 1', 'DOI 2', 'DOI 3', 'DOI 4']

  return (
    <>
      <div className="w-full flex flex-col items-center gap-10">
        <AccordionComponent
          itens={[
            {
              isRequired: true,
              fields: [
                <SelectOrganisms setValue={setOrganism} key="organism" />,
                <SelectComponent
                  isRequired={true}
                  options={cvtermOptions}
                  defaultSelectedKeys={cvterm}
                  label="cvterm"
                  setValue={setCvterm}
                  textOnHover="SO Sequence Ontology Term (eg. mRNA, polypeptide)"
                  key="cvterm"
                />,
                <SelectComponent
                  isRequired={true}
                  options={sotermOptions}
                  defaultSelectedKeys={soterm}
                  label="soterm"
                  setValue={setSoterm}
                  textOnHover="cvterm.name from cv feature_property. (eg. display, note, product, alias, ontology_term, annotation)"
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
                  defaultSelectedKeys={doi}
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
                  name="ignorenotfound"
                  isSelected={ignorenotfound}
                  onValueChange={setIgnorenotfound}
                  textOnHover="Don't raise error and exit if feature not found"
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
