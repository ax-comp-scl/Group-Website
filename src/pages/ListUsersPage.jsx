import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import Header from "../components/Header";
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";
import { getAllUsers, getUserByUsername } from "../services/userService";

export default function ListUsersPage() {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 300);

  const fetchUsers = async () => {
    if (debouncedSearchValue) {
      return await getUserByUsername(debouncedSearchValue);
    } else {
      return await getAllUsers();
    }
  };

  const {
    data: allUsersList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", debouncedSearchValue],
    queryFn: fetchUsers,
    enabled: !!debouncedSearchValue || debouncedSearchValue === "",
  });

  return (
    <div className="flex flex-col h-screen">
      <Header defaultSelectedKeys="Listar usuários" />
      <div className="flex-1 flex flex-col gap-10">
        <SearchBar
          onValueChange={setSearchValue}
        />

        {isLoading && (
          <div className="flex items-center justify-center text-zinc-400 font-semibold">
            <p>Carregando...</p>
          </div>
        )}

        {isError && (
          <div className="flex items-center justify-center text-red-500 font-semibold">
            <p>{`Erro ao carregar usuários: ${error.message}`}</p>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {allUsersList?.length === 0 ? (
              <div className="flex items-center justify-center break-all text-zinc-400 font-semibold">
                <p>{`Nenhum resultado foi encontrado para "${debouncedSearchValue}"`}</p>
              </div>
            ) : (
              <div className="px-10 grid grid-cols-4 justify-items-center gap-5 mb-12">
                {allUsersList?.map((user) => (
                  <UserCard data={user} key={user.id} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}