import { useState } from 'react'
import ButtonComponent from '../components/Button'
import CheckboxComponent from '../components/Checkbox'
import Header from '../components/Header'
import InputComponent from '../components/Input'
import ViewIconClosed from '../components/icons/ViewIconClosed'
import ViewIconOpened from '../components/icons/ViewIconOpened'
import { postData } from '../services/RequestsService'
import { toast } from 'react-hot-toast'

export default function CreateUserPage() {
  const [open, setOpen] = useState(true)

  const [username, setUserName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [isStaff, setIsStaff] = useState(0)
  const [isInvalid, setIsInvalid] = useState(false)

  const handleSubmit = async () => {
    if (!password || password.length < 4) {
    setIsInvalid(true)
    toast.error('A senha deve ter pelo menos 4 caracteres.')
    return
  }

    try {
      const data = await postData('account/', {
        username,
        email,
        password,
        is_staff: isStaff,
      })
      setUserName('')
      setEmail('')
      setPassword('')
      setIsStaff(0)

      toast.success('Usuário criado com sucesso!')
    } catch (error) {
      setIsInvalid(true)
      toast.error(
        error.response?.data?.message || 'Erro ao criar usuário, tente novamente.'
      )
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <Header defaultSelectedKeys="Criar usuário" />
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col gap-5 w-4/12 items-center">
          <InputComponent
            isInvalid={isInvalid}
            isRequired={true}
            type="text"
            label="Nome"
            variant="faded"
            value={username}
            onValueChange={setUserName}
          />
          <InputComponent
            isInvalid={isInvalid}
            isRequired={true}
            type="email"
            label="Email"
            variant="faded"
            value={email}
            onValueChange={setEmail}
          />
          <InputComponent
            isInvalid={isInvalid}
            isRequired={true}
            type={open ? 'password' : 'text'}
            label="Senha"
            variant="faded"
            endContent={
              <button onClick={() => setOpen(!open)} type="button">
                {open ? <ViewIconOpened /> : <ViewIconClosed />}
              </button>
            }
            value={password}
            onValueChange={setPassword}
          />
          <div className="w-7/12">
            <CheckboxComponent
              name="Administrador"
              isSelected={isStaff}
              onValueChange={setIsStaff}
            />
          </div>

          <ButtonComponent
            className="w-2/6"
            text="Cadastrar"
            onPress={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}
