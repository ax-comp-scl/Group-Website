import Header from "../components/adm/Header"
import { useState, useEffect } from "react"
import { useDebounce } from "use-debounce"
import OrganismCard from "../components/adm/OrganismCard"
import SearchBar from "../components/adm/SearchBar"

export default function ListOrganissPage(){
    const [searchValue, setSearchValue] = useState("")
    const [resultList, setResultList] = useState([])
    const [debounce] = useDebounce(searchValue, 500)

    function handleSearch() {
        if (debounce)
            setResultList(example.filter(organism => organism.toLowerCase().includes(debounce.toLowerCase())))
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
            <Header defaultSelectedKeys="Listar organismos"></Header> 
            <div className="flex-1 flex-col gap-10">
                <SearchBar
                    onValueChange={setSearchValue}
                    onPress={handleSearch}
                ></SearchBar>
                <div className="px-10 flex-1 flex flex-wrap gap-5">
                    {
                        searchValue === "" ?
                        (<div className="flex-1 flex items-center justify-center text-zinc-400 font-semibold"><p>Digite para buscar...</p></div>)
                        : resultList.length === 0 ?
                        (<div className="flex-1 flex items-center justify-center break-all text-zinc-400 font-semibold">
                            <p>{`Nenhum resultado foi encontrado para "${searchValue}"`}</p></div>)
                        : (resultList.map((e, i) => <OrganismCard name={e} />))
                    }
                </div>
            </div>
        </div>
    )
}