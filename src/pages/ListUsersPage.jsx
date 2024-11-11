import Header from "../components/adm/Header"
import { useState, useEffect } from "react"
import { useDebounce } from "use-debounce"
import UserCard from "../components/adm/UserCard"
import SearchBar from "../components/adm/SearchBar"

export default function ListUsersPage(){
    const [searchValue, setSearchValue] = useState("")
    const [resultList, setResultList] = useState([])
    const [debounce] = useDebounce(searchValue, 500)

    // async function handleSearch() {
    function handleSearch() {
        if (debounce){
            // const response = await fetch('http://127.0.0.1:8000/api/account') //usar nome
            // const data = await response.json()
            // if (data.ok) setResultList(data)
            // setResultList(prev => prev.filter(usr => usr.name.toLowerCase().includes(debounce.toLowerCase())))
            setResultList(example.filter(usr => usr.data.name.toLowerCase().includes(debounce.toLowerCase())))
        }
        else setResultList([])
    }

    useEffect(() => {
        handleSearch()
    }, [debounce])

    const example = [
        {
            role: "usr",
            data: {
                name: "User1",
                email: "user1@mail.com",
                role: "Usuário"
            }
        },
        {
            role: "usr",
            data: {
                name: "User2",
                email: "user2@mail.com",
                role: "Usuário"
            }
        },
        {
            role: "usr",
            data: {
                name: "User3",
                email: "user3@mail.com",
                role: "Usuário"
            }
        },
        {
            role: "pes",
            data: {
                name: "Pes",
                email: "user4@mail.com",
                role: "Pesquisador"
            }
        },
        {
            role: "adm",
            data: {
                name: "Adm",
                email: "user5@mail.com",
                role: "Administrador"
            }
        },
        {
            role: "adm",
            data: {
                name: "Adm",
                email: "user5@mail.com",
                role: "Administrador"
            }
        },
        {
            role: "adm",
            data: {
                name: "Adm",
                email: "user5@mail.com",
                role: "Administrador"
            }
        },
        {
            role: "adm",
            data: {
                name: "Adm",
                email: "user5@mail.com",
                role: "Administrador"
            }
        },
        {
            role: "adm",
            data: {
                name: "Adm",
                email: "user5@mail.com",
                role: "Administrador"
            }
        },
        {
            role: "adm",
            data: {
                name: "Adm",
                email: "user5@mail.com",
                role: "Administrador"
            }
        },
        {
            role: "adm",
            data: {
                name: "Adm",
                email: "user5@mail.com",
                role: "Administrador"
            }
        },
        {
            role: "adm",
            data: {
                name: "Adm",
                email: "user5@mail.com",
                role: "Administrador"
            }
        },
        {
            role: "adm",
            data: {
                name: "Adm",
                email: "user5@mail.com",
                role: "Administrador"
            }
        },
        
        
    ]


    return(
        <div className="flex flex-col h-screen">
            <Header defaultSelectedKeys="Listar usuários"/> 
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
                        // <div className="grid grid-cols-5 justify-items-center gap-5">
                        <div className="px-10 grid grid-cols-4 justify-items-center gap-5 mb-12">
                            {/* {resultList.map((e, i) => <DataCard type={dataType} name={e} key={i} />)} */}
                            {resultList.map((e, i) =>  <UserCard role={e.role} data={e.data} key={i}/>)}
                        </div>
                    )
                }
            </div>
        </div>
    )
}