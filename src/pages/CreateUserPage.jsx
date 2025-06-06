import { useState } from 'react'
import ButtonComponent from '../components/Button'
import CheckboxComponent from '../components/Checkbox'
import Header from '../components/Header'
import InputComponent from '../components/Input'
import ViewIconClosed from '../components/icons/ViewIconClosed'
import ViewIconOpened from '../components/icons/ViewIconOpened'
import { postData } from '../services/RequestsService'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

const createUserSchema = z.object({
  username: z.string().min(1, 'Nome de usuário é obrigatório'),
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  password: z.string().min(4, 'A senha deve ter no mínimo 4 caracteres'),
  isStaff: z.boolean().optional().or(z.literal(false))
})

export default function CreateUserPage() {
  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      isStaff: false,
    },
  })

  const onSubmit = async (data) => {
    try {
      await postData('account/', {
        username: data.username,
        email: data.email,
        password: data.password,
        is_staff: data.isStaff,
      })
      toast.success('Usuário cadastrado com sucesso!')
      reset()
    } catch (error) {
      if (error.status === 400) {
        toast.error('Usuário já cadastrado no sistema.')
      }
      console.error('Error creating user:', error)
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <Header defaultSelectedKeys="Criar usuário" />
      <div className="flex-1 flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-4/12 items-center"
        >
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <InputComponent
                {...field}
                isRequired={true}
                type="text"
                label="Nome"
                variant="faded"
                isInvalid={!!errors.username}
                errorMessage={errors.username?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputComponent
                {...field}
                isRequired={true}
                type="email"
                label="Email"
                variant="faded"
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
                isRequired={true}
                type={showPassword ? 'text' : 'password'}
                label="Senha"
                variant="faded"
                endContent={
                  <button onClick={() => setShowPassword(!showPassword)} type="button">
                    {showPassword ? <ViewIconOpened /> : <ViewIconClosed />}
                  </button>
                }
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <div className="w-7/12">
            <Controller
              name="isStaff"
              control={control}
              render={({ field }) => (
                <CheckboxComponent
                  name="Administrador"
                  isSelected={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
          </div>

          <ButtonComponent
            className={`w-2/6 ${isSubmitting ? 'opacity-60 pointer-events-none' : ''}`}
            text={isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
            icon={
              isSubmitting ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : undefined
            }
            type="submit"
            disabled={isSubmitting}
          />
        </form>
      </div>
    </div>
  )
}
