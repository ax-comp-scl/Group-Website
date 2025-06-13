import { Kbd } from '@nextui-org/kbd'
import { useState } from 'react'
import { deleteData, putData } from '../services/RequestsService'
import AvatarComponent from './Avatar'
import ButtonComponent from './Button'
import CheckboxComponent from './Checkbox'
import InputComponent from './Input'
import ModalEdit from './ModalEdit'
import ModalOption from './ModalOption'
import ModalView from './ModalView'
import EditIcon from './icons/EditIcon'
import ExcludeIcon from './icons/ExcludeIcon'
import ViewIconClosed from './icons/ViewIconClosed'
import ViewIconOpened from './icons/ViewIconOpened'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

const editUserSchema = z.object({
  editUsername: z.string().min(1, 'Nome de usuário é obrigatório'),
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  password: z.string().min(4, 'A senha deve ter no mínimo 4 caracteres').optional().or(z.literal('')),
  isStaffCheck: z.boolean().optional(),
})

export default function UserCard(props) {
  const [username, setUsername] = useState(props.data.username)
  const [isStaff, setIsStaff] = useState(props.data.is_staff)
  const [isViewOpen, setViewOpen] = useState(false)
  const [isEditOpen, setEditOpen] = useState(false)
  const [isOptionOpen, setOptionOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      editUsername: props.data.username,
      email: props.data.email,
      password: '',
      isStaffCheck: props.data.is_staff,
    },
  })

  const handleViewOpen = () => setViewOpen(true)
  const handleEditOpen = () => setEditOpen(true)
  const handleOptionOpen = () => setOptionOpen(true)
  const toggleVisibility = () => setIsVisible(!isVisible)

  const createInputs = () => (
    <>
      <Controller
        name="editUsername"
        control={control}
        render={({ field }) => (
          <InputComponent
            {...field}
            label="Nome"
            type="text"
            isInvalid={!!errors.editUsername}
            errorMessage={errors.editUsername?.message}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <InputComponent
            {...field}
            label="Email"
            type="email"
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <InputComponent
            {...field}
            label="Senha"
            type={isVisible ? 'text' : 'password'}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? <ViewIconOpened /> : <ViewIconClosed />}
              </button>
            }
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
          />
        )}
      />
      <Controller
        name="isStaffCheck"
        control={control}
        render={({ field }) => (
          <CheckboxComponent
            name="Administrador"
            isSelected={field.value}
            onValueChange={field.onChange}
          />
        )}
      />
    </>
  )

  const createParagraphs = () => (
    <>
      <p>Nome: {username}</p>
      <p>Email: {props.data.email}</p>
      <p>Papel: {isStaff ? 'Administrador' : 'Usuário'}</p>
    </>
  )

  // This function now handles the full delete lifecycle
  const handleExclude = async () => {
    setIsDeleting(true)
    try {
      const token = localStorage.getItem('authToken')
      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
      const id = props.data.id
      await deleteData(`account/${id}`, config)
      toast.success('Usuário excluído com sucesso!')
      props.loadData()
      setOptionOpen(false) // Close modal only on success
    } catch (error) {
      toast.error('Erro ao excluir usuário.')
      console.error('Error deleting user:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleEdit = async (data) => {
    try {
      const payload = {
        username: data.editUsername,
        email: data.email,
        is_staff: data.isStaffCheck,
      }

      if (data.password) {
        payload.password = data.password
      }

      await putData(`account/${props.data.id}`, payload)

      setIsStaff(data.isStaffCheck)
      props.loadData()
      setUsername(data.editUsername)
      setEditOpen(false)
      toast.success('Usuário atualizado com sucesso!')
    } catch (error) {
      toast.error('Erro ao editar usuário.')
      console.error('Error editing user:', error)
    }
  }

  return (
    <>
      <div className="flex flex-col bg-[#F5F5F5] z-0 rounded-xl border-2 w-full max-w-sm">
        <div className="flex items-center p-2 justify-between flex-1">
          <div className="flex gap-5 items-center">
            <AvatarComponent size="sm" isDisabled={true} />
            <p className="break-all text-left">
              <span className="font-bold text-lg">{username}</span>
            </p>
          </div>
          {isStaff && (
            <div>
              <Kbd className="text-[#FF3232]">ADM</Kbd>
            </div>
          )}
        </div>
        <div className="border-t-2" />
        <div className="flex-1 flex flex-col items-center gap-5 p-3">
          <ButtonComponent
            icon={<ViewIconOpened />}
            variant="ghost"
            color="default"
            text="Visualizar"
            onPress={handleViewOpen}
          />

          <ModalView
            isOpen={isViewOpen}
            onOpenChange={setViewOpen}
            body={createParagraphs()}
            header="Visualizando usuário"
          />

          {!isStaff && (
            <div className="flex gap-5 justify-center">
              <ButtonComponent
                icon={<EditIcon />}
                variant="ghost"
                color="default"
                text="Editar"
                onPress={handleEditOpen}
              />

              <ButtonComponent
                icon={<ExcludeIcon className="size-6" />}
                variant="ghost"
                color="default"
                text="Excluir"
                onPress={handleOptionOpen}
              />
              <ModalEdit
                isOpen={isEditOpen}
                onOpenChange={setEditOpen}
                header="Editando usuário"
                body={createInputs()}
                handleEdit={handleSubmit(handleEdit)}
                isSubmitting={isSubmitting}
                submitButtonText={isSubmitting ? "Salvando..." : "Salvar"}
                submitButtonIcon={isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : undefined}
              />

              <ModalOption
                isOpen={isOptionOpen}
                onOpenChange={setOptionOpen}
                handleConfirm={handleExclude}
                isConfirming={isDeleting}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}