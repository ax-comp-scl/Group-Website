import Header from "../components/adm/Header"
import { useState, useEffect } from "react"
import { useDebounce } from "use-debounce"
import DataCard from "../components/adm/DataCard"
import DataSearchBar from "../components/adm/DataSearchBar"
import { fetchProtectedData } from "../services/authService"

export default function ListDataPage(){
    const [searchValue, setSearchValue] = useState("")
    const [resultList, setResultList] = useState([])
    const [allDataList, setAllDataList] = useState([])
    const [selectedKey, setSelectedKey] = useState("Organism")
    const [dataType, setDataType] = useState("organism")
    const [url, setUrl] = useState("organisms")

    const [debounce] = useDebounce(searchValue, 200)
    
    async function handleSearch() {
        if (debounce){
            setResultList(allDataList.filter(organism => organism['genus'].toLowerCase().includes(debounce.toLowerCase())))
        }
        else
            setResultList([])
        console.log(allDataList)
    }

    useEffect(() => {
        handleSearch()
    }, [debounce, allDataList])

    const urls = {
        Ontology: {
            type: "ontology",
            url: "ontology",
        },
        Organism: {
            type: "organism",
            url: "organisms",
        },
        Publication: {
            type: "publication",
            url: "publication",
        },
        File: { type: "file", url: "file" },
        "Feature annotation": {
            type: "feature_annotation",
            url: "feature-annotation",
        },
        Analysis: {
            type: "analysis",
            url: "analysis",
        },
    };

    const options = [
        "Ontology",
        "Organism",
        "Publication",
        "File",
        "Feature annotation",
        "Analysis",
    ];

    useEffect(()=>{
        if (selectedKey && urls[selectedKey.currentKey]){
            setDataType(urls[selectedKey.currentKey]['type'])
            setUrl(urls[selectedKey.currentKey]['url'])
        }
        loadData()
    }, [selectedKey])

    const loadData = async () => {
        const data = await fetchProtectedData(`api/${url}`)
        setAllDataList(data)
    }
    
    useEffect(() => {
        loadData()
    }, [])

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
                                    {resultList.map((e, i) => <DataCard type={dataType} data={e} key={i} loadData={loadData} url={url} />)}
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}