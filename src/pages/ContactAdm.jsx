import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Modal } from '@nextui-org/react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import loginImg from '../assets/login-page-img.jpg'
import logoEmbrapa from '../assets/logo-embrapa.png'
import ModalSuccess from '../components/ModalSuccess'
import { loginUser } from '../services/authService'

export default function ContactAdminPage() {
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const contactSchema = z.object({
    email: z.string().email('Insira um E-mail válido'),
    message: z.string(),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: '',
      message: '',
    },
  })

  const onSubmit = async data => {
    setShowModal(true)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 ">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <div className="button-back">
            <a href="/login">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-arrow-left-icon lucide-arrow-left"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
            </a>
          </div>
          <div className="h-[100px] mb-4 flex justify-center md:justify-start">
            <img
              src={logoEmbrapa}
              alt="img"
              className="h-full rounded-r-2xl md:block object-cover"
            />
          </div>
          <span className="mb-3 text-4xl font-bold">Contate um Admin</span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-4">
              <span className="mb-2 text-md">
                E-mail para entrarmos em contato
              </span>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Seu e-mail"
                    variant="bordered"
                    radius="sm"
                    color={errors.email ? 'danger' : 'success'}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                  />
                )}
              />
            </div>
            <div className="py-4">
              <label for="message" class="mb-2 text-md">
                Sua mensagem
              </label>
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="message"
                    rows="4"
                    class="block 
                  p-2.5 w-full text-sm text-gray-900 bg-gray-50 
                  rounded-lg border border-gray-300 focus:ring-blue-500 
                  focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
                  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Digite aqui..."
                  />
                )}
              />
            </div>

            <Button
              type="submit"
              color="default"
              variant="solid"
              radius="small"
              className="text-lg bg-black text-white rounded-lg mb-6 p-2 w-full  hover:bg-green-900 hover:text-white hover:border hover:border-gray-300"
            >
              Enviar
            </Button>
          </form>
        </div>
        <div className="relative w-[350px]">
          <img
            src={loginImg}
            alt="img"
            className="h-full hidden rounded-r-2xl md:block object-cover"
          />
        </div>
      </div>
      {showModal && <ModalSuccess close={setShowModal} />}
    </div>
  )
}
