import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@nextui-org/react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import loginImg from '../assets/login-page-img.jpg'
import logoEmbrapa from '../assets/logo-embrapa.png'
import ViewIconClosed from '../components/icons/ViewIconClosed'
import ViewIconOpened from '../components/icons/ViewIconOpened'
import { loginUser } from '../services/authService'

const loginSchema = z.object({
  email: z.string().email('Insira um E-mail válido'),
  password: z.string().min(4, 'A senha deve ter pelo menos 4 caracteres'),
})

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
  const navigate = useNavigate()
  const [loginErrorMessage, setLoginErrorMessage] = useState('')

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async data => {
    try {
      const user = await loginUser(data.email, data.password)
      if (user) {
        navigate('/admin/history')
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      setLoginErrorMessage('Credenciais inválidas')

      setTimeout(() => {
        setLoginErrorMessage('')
      }, 1500)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 ">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <div className="h-[100px] mb-4">
            <img
              src={logoEmbrapa}
              alt="img"
              className="h-full hidden rounded-r-2xl md:block object-cover"
            />
          </div>
          <span className="mb-3 text-4xl font-bold">Bem-Vindo</span>
          <span className="mb-2 font-light text-gray-500">
            Acesse sua conta
          </span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-4">
              <span className="mb-2 text-md">E-mail</span>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Seu e-mail"
                    variant="bordered"
                    radius="sm"
                    isClearable
                    color={errors.email ? 'danger' : 'success'}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                  />
                )}
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">Senha</span>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type={isVisible ? 'text' : 'password'}
                    placeholder="Sua senha"
                    variant="bordered"
                    radius="sm"
                    color={errors.password ? 'danger' : 'success'}
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label="toggle password visibility"
                      >
                        {isVisible ? (
                          <ViewIconOpened className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <ViewIconClosed className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                  />
                )}
              />
            </div>

            {loginErrorMessage && (
              <div className="flex justify-center py-4">
                <span className="text-danger font-bold text-lg">
                  {loginErrorMessage}
                </span>
              </div>
            )}
            <div className="flex justify-end w-full py-4">
              <span className="font-bold text-md border-b-2 border-black hover:border-green-900 hover:text-green-900 cursor-pointer">
                Recuperar senha
              </span>
            </div>
            <Button
              type="submit"
              color="default"
              variant="solid"
              radius="small"
              className="text-lg bg-black text-white rounded-lg mb-6 p-2 w-full  hover:bg-green-900 hover:text-white hover:border hover:border-gray-300"
            >
              Entrar
            </Button>
          </form>
          <div className="text-center text-gray-500">
            Não possui cadastro?
            <a
              href="/contact"
              className="font-bold text-black border-b-2 border-black hover:border-green-900 hover:text-green-900 cursor-pointer"
            >
              {' '}
              Contate um administrador
            </a>
          </div>
        </div>
        <div className="relative w-[350px]">
          <img
            src={loginImg}
            alt="img"
            className="h-full hidden rounded-r-2xl md:block object-cover"
          />
        </div>
      </div>
    </div>
  )
}
