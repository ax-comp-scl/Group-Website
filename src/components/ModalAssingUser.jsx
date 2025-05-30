import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import { Divider } from '@nextui-org/react'
import { Kbd } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { getUserByUsername } from '../services/userService'
import UserSearchCard from './UserSearchCard'
import SearchIcon from './icons/SearchIcon'

export default function ModalAssingUser(props) {
  const [searchValue, setSearchValue] = useState('')
  const [resultList, setResultList] = useState([])
  const [allUsersList, setAllUsersList] = useState([])
  const [debounce] = useDebounce(searchValue, 200)

  const handleSearch = useCallback(() => {
    if (debounce) {
      setResultList(
        allUsersList.filter(usr =>
          usr.username.toLowerCase().includes(debounce.toLowerCase())
        )
      )
    } else setResultList([])
  }, [debounce, allUsersList])

  useEffect(() => {
    handleSearch()
  }, [handleSearch])

  const loadData = useCallback(async () => {
    const data = await getUserByUsername(searchValue)
    setAllUsersList(data)
  }, [searchValue])

  useEffect(() => {
    if (searchValue) loadData()
  }, [searchValue, loadData])

  return (
    <Modal
      size="xl"
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      isKeyboardDismissDisabled={false}
      classNames={{
        body: 'overflow-x-hidden',
        closeButton: 'hidden',
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
                onChange={e => setSearchValue(e.target.value)}
              />
              <div>
                <Kbd className="items-center text-center shadow-small rounded-small hidden md:block border-none px-2 py-1 font-semibold text-xs">
                  <span>ESC</span>
                </Kbd>
              </div>
            </div>
            {resultList.length > 0 && (
              <>
                <Divider />
                <ModalBody className="overflow-y-auto max-h-[60vh] py-5">
                  {resultList.map(u => (
                    <UserSearchCard user={u} key={u.id} />
                  ))}
                </ModalBody>
              </>
            )}
          </div>
        }
      </ModalContent>
    </Modal>
  )
}
