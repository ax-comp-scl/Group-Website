import Header from "../components/adm/Header"
import { useState, useEffect } from "react"
import { useDebounce } from "use-debounce"
import DataCard from "../components/adm/DataCard"
import DataSearchBar from "../components/adm/DataSearchBar"

export default function ListDataPage(){
    const [searchValue, setSearchValue] = useState("")
    const [resultList, setResultList] = useState([])
    const [dataType, setDataType] = useState({"type": "ontology", "url":"http://localhost:8080/api/v1/ontology"})
    const [debounce] = useDebounce(searchValue, 200)
    
    function handleSearch() {
        if (debounce){
            // fetch(`${dataType.url}/${searchValue}`)
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
        "GG"
    ]

    return(
        <div className="flex flex-col h-screen">
            <Header defaultSelectedKeys="Listar dados"/> 
            <div className="flex flex-1 flex-col gap-10">
                <DataSearchBar
                    setDataType={setDataType}
                    onValueChange={setSearchValue}
                    onPress={handleSearch}
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
                                    {resultList.map((e, i) => <DataCard name={e} key={i} />)}
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}