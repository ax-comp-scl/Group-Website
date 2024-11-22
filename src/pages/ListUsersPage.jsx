import Header from "../components/Header"
import { useState, useEffect } from "react"
import { useDebounce } from "use-debounce"
import UserCard from "../components/UserCard"
import SearchBar from "../components/SearchBar"
import { fetchProtectedData } from "../services/authService"

export default function ListUsersPage() {
    const [searchValue, setSearchValue] = useState("")
    const [resultList, setResultList] = useState([])
    const [allUsersList, setAllUsersList] = useState([])
    const [debounce] = useDebounce(searchValue, 200)

    async function handleSearch() {
        if (debounce) {
            setResultList(allUsersList.filter(usr => usr.username.toLowerCase().includes(debounce.toLowerCase())))
        }
        else setResultList([])
    }

    useEffect(() => {
        handleSearch()
    }, [debounce, allUsersList])

    const loadData = async () => {
        const data = await fetchProtectedData("account/")
        setAllUsersList(data)
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <div className="flex flex-col h-screen">
            <Header defaultSelectedKeys="Listar usuários" />
            <div className="flex-1 flex flex-col gap-10">
                <SearchBar
                    onValueChange={setSearchValue}
                    onPress={handleSearch}
                />
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
                                <div className="px-10 grid grid-cols-4 justify-items-center gap-5 mb-12">
                                    {resultList.map((e, i) => <UserCard data={e} key={i} loadData={loadData} />)}
                                </div>
                            )
                }
            </div>
        </div>
    )
}