import { Divider } from '@nextui-org/divider'
import { Tab } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import embrapa from '../assets/logo-embrapa.png'
import { getUser } from '../services/userService'
import AvatarComponent from './Avatar'
import Navbar from './Navbar'

export default function Header() {
  const user = getUser()

  const admOptions = [
    { key: '/history', title: 'Histórico' },
    { key: '/admin/create-user', title: 'Criar usuário' },
    { key: '/admin/users', title: 'Listar usuários' },
    { key: '/admin/upload/ontologies', title: 'Carregar dados' },
  ]

  const userOptions = [{ key: '/history', title: 'Histórico' }]

  const options = user.is_staff ? admOptions : userOptions
  const tabOptions = options.map(tab => <Tab key={tab.key} title={tab.title} />)

  return (
    <div className="sticky top-0 bg-white/50 backdrop-blur-sm z-50">
      <div className="px-12 py-4 flex items-center justify-between">
        <div className="w-40 hidden md:block">
          <Link to={'/history'}>
            <img src={embrapa} alt="Logo da Embrapa" />
          </Link>
        </div>

        <div className=" flex justify-center">
          <Navbar options={tabOptions} base="w-full max-w-2xl" />
        </div>

        <div className="w-40 flex justify-end">
          <AvatarComponent size="lg" />
        </div>
      </div>
      <Divider />
    </div>
  )
}
