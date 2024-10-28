import SearchBar from "./SearchBar"
import SelectComponent from "./Select"
import { useState, useEffect } from "react";

export default function DataSearchBar(props){
    const [selectedKey, setSelectedKey] = useState("Organism");
    const options = ["Ontology",
        "Organism",
        "Publication",
        "File",
        "Feature annotation",
        "Analisys"]
        
    const urls = {
        "Ontology": {"type": "ontology", "url":"http://localhost:8080/api/v1/ontology"}, 
        "Organism": {"type": "organism", "url":"http://localhost:8080/api/v1/organism"}, 
        "Publication": {"type": "publication", "url":"http://localhost:8080/api/v1/publication"}, 
        "File": {"type": "file", "url":"http://localhost:8080/api/v1/file"},
        "Feature annotation": {"type": "feature_annotation", "url":"http://localhost:8080/api/v1/"},
        "Analisys": {"type": "analysis", "url":"http://localhost:8080/api/v1/analisys"}
    }
    
    useEffect(() => {
        // console.log(urls[selectedKey.currentKey])
        props.setDataType(urls[selectedKey.currentKey])
    }, [selectedKey])

    return(
        <>
            <SearchBar className="justify-between" onValueChange={props.onValueChange} onPress={props.onPress}>
                <SelectComponent label="Tipo de dado" options={options} defaultSelectedKeys="Organism" setValue={setSelectedKey}/>
            </SearchBar>
        </>
    )
}