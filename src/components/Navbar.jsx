import { Tabs } from '@nextui-org/react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Navbar({ options, base, selectedKey }) {
  const navigate = useNavigate()
  const location = useLocation()

  const validKeys = options.map(opt => opt.key)

  const handleChange = key => {
    if (validKeys.includes(key)) {
      navigate(key)
    }
  }

  const currentKey = validKeys.includes(location.pathname)
    ? location.pathname
    : undefined

  return (
    <Tabs
      size="lg"
      radius="sm"
      selectedKey={selectedKey ?? currentKey}
      onSelectionChange={handleChange}
      classNames={{
        base,
        tabList: 'flex flex-wrap',
        tab: 'flex-1 text-center',
      }}
    >
      {options}
    </Tabs>
  )
}
