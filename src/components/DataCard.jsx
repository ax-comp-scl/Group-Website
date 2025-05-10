import { useState } from 'react'
import { deleteData } from '../services/RequestsService'
import ButtonComponent from './Button'
import ModalAssingUser from './ModalAssingUser'
import ModalOption from './ModalOption'
import ExcludeIcon from './icons/ExcludeIcon'
import ViewIconOpened from './icons/ViewIconOpened'

export default function DataCard(props) {
  const [isViewOpen, setViewOpen] = useState(false)
  const [isOptionOpen, setOptionOpen] = useState(false)

  const handleViewOpen = () => {
    setViewOpen(true)
  }

  const handleOptionOpen = () => {
    setOptionOpen(true)
  }

  const handleExclude = async () => {
    try {
      const id = props.data.organism_id
      const data = await deleteData(`api/${props.url}/${id}`)
      props.loadData()
    } catch (error) {}
  }

  return (
    <div className="rounded-lg bg-[#F5F5F5] border-2 max-w-72">
      <p className="m-5 text-center font-bold">
        {props.data.genus} {props.data.species}
      </p>
      <div className="divider" />
      <div className="flex justify-center items-center gap-5 p-3 min-w-72">
        {props.isStaff && props.type === 'organism' && (
          <>
            <ButtonComponent
              icon={<ViewIconOpened />}
              variant="ghost"
              size={props.size}
              color="default"
              text="Usuários"
              onPress={handleViewOpen}
            />
            <ModalAssingUser isOpen={isViewOpen} onOpenChange={setViewOpen} />
          </>
        )}
        {props.isStaff && (
          <>
            <ButtonComponent
              icon={<ExcludeIcon className="size-6" />}
              variant="ghost"
              size={props.size}
              color="default"
              text="Excluir"
              onPress={handleOptionOpen}
            />
            <ModalOption
              isOpen={isOptionOpen}
              onOpenChange={setOptionOpen}
              handleConfirm={() => {
                handleExclude()
                setOptionOpen(false)
              }}
            />
          </>
        )}
      </div>
    </div>
  )
}
