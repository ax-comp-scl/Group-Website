import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import SearchIcon from "./icons/SearchIcon";
import { Divider } from "@nextui-org/react";
import { Kbd } from "@nextui-org/react";
import UserSearchCard from "./UserSearchCard";
import { useState, useEffect } from "react"
import { useDebounce } from "use-debounce"
import { getUserByUsername } from "../services/userService";

export default function ModalAssingUser(props) {
  const [searchValue, setSearchValue] = useState("")
  const [resultList, setResultList] = useState([])
  const [allDataList, setAllDataList] = useState([])
  const [debounce] = useDebounce(searchValue, 200)

  async function handleSearch() {
    if (debounce) {
      setResultList(allDataList.filter(usr => usr.username.toLowerCase().includes(debounce.toLowerCase())))
    }
    else setResultList([])
  }

  useEffect(() => {
    handleSearch()
  }, [debounce, allDataList])

  const loadData = async () => {
    const token = localStorage.getItem("authToken");
    const config = {
      headers: {
        Authorization: `Token ${token}`,
      }
    }
    const data = await getUserByUsername(searchValue, config)
    setAllDataList(data)
  }

  useEffect(() => {
    if (searchValue) loadData()
  }, [searchValue])

  return (
    <Modal
      size="xl"
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      isKeyboardDismissDisabled={false}
      classNames={{
        body: "overflow-x-hidden",
        closeButton: "hidden",
      }}
    >
      <ModalContent>
        {
          <div className="flex flex-col bg-[#d6d6d6]">
            <div className="w-full flex bg-[#d6d6d6] items-center justify-between px-2 gap-2">
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              <input
                type="text"
                placeholder="Digite para buscar..."
                className="flex-1 bg-[#d6d6d6] focus:outline-none h-14 text-xl text-gray-600"
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <div>
                <Kbd className="items-center text-center shadow-small rounded-small hidden md:block border-none px-2 py-1 font-semibold text-xs">
                  <span>ESC</span>
                </Kbd>
              </div>
            </div>
            {
              resultList.length > 0 &&
              <>
                <Divider></Divider>
                <ModalBody className="overflow-y-auto max-h-[60vh] py-5">
                  {resultList.map((u) => <UserSearchCard user={u} />)}
                </ModalBody>
              </>
            }
          </div>
        }
      </ModalContent>
    </Modal>
  );
}
