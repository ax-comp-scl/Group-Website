import AccordionComponent from "../components/adm/Accordion"
import InputComponent from "../components/adm/Input"
import ButtonComponent from "../components/adm/Button"
import { useState, useContext, useEffect } from "react"
import { FormsContext } from "../FormsContext"
import { postData } from "../services/RequestsService"

export default function OrganismPage(){
    const {handleFormChange, formData} = useContext(FormsContext)

    const [genus, setGenus] = useState(formData.organism.genus)
    const [species, setSpecies] = useState(formData.organism.species)
    const [abbreviation, setAbbreviation] = useState(formData.organism.abbreviation)
    const [infraspecificName, setInfraspecificName] = useState(formData.organism.infraspecificName)
    const [comment, setComment] = useState(formData.organism.comment)
    const [commonName, setCommonName] = useState(formData.organism.commonName)

    const handleSubmit = async () => {
         const token = localStorage.getItem("authToken");
            
        const config = {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json",
                "accept": "application/json"
            }
        }
        
        const response = await postData("api/organisms", 
            {genus, species, abbreviation, infraspecific_name: infraspecificName, comment, common_name: commonName},
            config)
        setGenus("")
        setSpecies("")
        setAbbreviation("")
        setInfraspecificName("")
        setComment("")
        setCommonName("")
    }

    useEffect(() => {
      const organismData = {
            genus,
            species,
            abbreviation,
            infraspecificName,
            comment,
            commonName,
        }
        formData["organism"] = organismData
        handleFormChange(formData)
    }, [genus, species, abbreviation, infraspecificName, comment, commonName])
    

    return(
        <>
            <div className="flex flex-col items-center gap-10">
                <AccordionComponent
                itens = {[
                    {
                        isRequired: true,
                        fields: [
                            <InputComponent isRequired={true} label="genus" type="text" value={genus} onValueChange={setGenus}/>,
                            <InputComponent isRequired={true} label="species" type="text" value={species} onValueChange={setSpecies}/>,
                        ]
                    },
                    {
                        fields: [
                            <InputComponent label="abbreviation" type="text" value={abbreviation} onValueChange={setAbbreviation}/>,
                            <InputComponent label="infraspecific_name" type="text" value={infraspecificName} onValueChange={setInfraspecificName}/>,
                            <InputComponent label="comment" type="text" value={comment} onValueChange={setComment}/>,
                            <InputComponent label="common_name" type="text" value={commonName} onValueChange={setCommonName}/>,
                        ]
                    },
                ]}/>
                <ButtonComponent text="Confirmar" onPress={handleSubmit}/>
            </div>
        </>
    )
}