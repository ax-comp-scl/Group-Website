import Header from "../components/adm/Header"
import { useState, useEffect } from "react"
import { useDebounce } from "use-debounce"
import DataCard from "../components/adm/DataCard"
import DataSearchBar from "../components/adm/DataSearchBar"

export default function ListDataPage(){
    const [searchValue, setSearchValue] = useState("")
    const [resultList, setResultList] = useState([])
    const [selectedKey, setSelectedKey] = useState("Organism")
    const [dataType, setDataType] = useState("organism")
    const [debounce] = useDebounce(searchValue, 200)
    
    function handleSearch() {
        if (debounce){
            // fetch(`${urls[selectedKey.currentKey]['url']}/${searchValue}`)
            setResultList(example.filter(organism => organism.toLowerCase().includes(debounce.toLowerCase())))
        }
        else
            setResultList([])
    }

    useEffect(() => {
        handleSearch()
    }, [debounce])

    const example = [
        "Genoma1",
        "Genoma2",
        "Genoma3",
        "Fasta",
        "Fast",
        "Fast",
        "GG"
    ]

    const options = [
        "Ontology",
        "Organism",
        "Publication",
        "File",
        "Feature annotation",
        "Analysis",
    ];

    const urls = {
        Ontology: {
            type: "ontology",
            url: "http://localhost:8080/api/v1/ontology",
        },
        Organism: {
            type: "organism",
            url: "http://localhost:8080/api/v1/organism",
        },
        Publication: {
            type: "publication",
            url: "http://localhost:8080/api/v1/publication",
        },
        File: { type: "file", url: "http://localhost:8080/api/v1/file" },
        "Feature annotation": {
            type: "feature_annotation",
            url: "http://localhost:8080/api/v1/",
        },
        Analysis: {
            type: "analysis",
            url: "http://localhost:8080/api/v1/analysis",
        },
    };

    useEffect(()=>{
        if (selectedKey && urls[selectedKey.currentKey])
            setDataType(urls[selectedKey.currentKey]['type'])
    }, [selectedKey])

    return(
        <div className="flex flex-col h-screen">
            <Header defaultSelectedKeys="Listar dados"/> 
            <div className="flex flex-1 flex-col gap-10">
                <DataSearchBar
                    defaultSelectedKeys="Organism"
                    setValue={setSelectedKey}
                    onValueChange={setSearchValue}
                    onPress={handleSearch}
                    options={options}
                />
                <div className="px-10 mb-12">
                    {
                        searchValue === "" ?
                            (<div className="flex items-center justify-center text-zinc-400 font-semibold">
                                <p>Digite para buscar...</p>
                            </div>)
                            : resultList.length === 0 ?
                                (<div className="flex items-center justify-center break-all text-zinc-400 font-semibold">
                                    <p>{`Nenhum resultado foi encontrado para "${searchValue}"`}</p>
                                </div>)
                            : (
                                <div className="grid grid-cols-5 justify-items-center gap-5">
                                    {resultList.map((e, i) => <DataCard type={dataType} name={e} key={i} />)}
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}