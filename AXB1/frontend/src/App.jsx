import Header from './components/adm/Header'
import Timeline from './components/adm/Timeline'
import AccordionComponent from './components/adm/Accordion'
import UserCard from './components/adm/UserCard'
import DataCard from './components/adm/DataCard'
import InputComponent from './components/adm/Input'
import CheckboxComponent from './components/adm/Checkbox'
import ButtonComponent from './components/adm/Button'
import SelectNavigation from './components/adm/Select'

function App() {
  const dados = {
    name: "canguru",
    email: "canguru@mail.com",
    role: "Usuário"
  }

  const timelineData = [
    {
      fasta: "fasta1",
      username: "username1",
      time: "12h34",
      date: "12/34/5678",
      isInsert: true
    },
    {
      fasta: "fasta2",
      username: "username2",
      time: "22h34",
      date: "22/34/5678",
      isInsert: true
    },
    {
      fasta: "fasta3",
      username: "username3",
      time: "32h34",
      date: "32/34/5678",
      isInsert: false
    },
    {
      fasta: "fasta4",
      username: "username4",
      time: "42h34",
      date: "42/34/5678",
      isInsert: false
    },
  ]

  return (
    <>
      <div className='flex flex-col gap-10'>
        
        <Header defaultSelectedKeys="Tela inicial" />
        <SearchMenu />
        <UserCard role="usr" data={dados} />
        <UserCard role="pes" data={dados} />
        <UserCard role="adm" data={dados} />
        <DataCard name={"Super organismo"} />
        <div className='w-9/12'>
          <AccordionComponent itens ={[
            {
              isRequired: true,
              fields: [
              <InputComponent isRequired={true} label="Organismo" type="text" value="" onChange={() => { console.log("a") }} />,
              <InputComponent label="Organismo" type="text" value="" onChange={() => { console.log("a") }} />,
              <InputComponent label="Organismo" type="text" value="" onChange={() => { console.log("a") }} />,
              <InputComponent label="Organismo" type="text" value="" onChange={() => { console.log("a") }} />,
              <InputComponent label="Organismo" type="text" value="" onChange={() => { console.log("a") }} />,
              <CheckboxComponent name="Restrito"/>]
            },
            {
              isRequired: true,
              fields: [
                <InputComponent label="Organismo" type="text" value="" onChange={() => { console.log("a") }} />,
                <InputComponent label="Organismo" type="text" value="" onChange={() => { console.log("a") }} />,
                <InputComponent label="Organismo" type="text" value="" onChange={() => { console.log("a") }} />,
                <InputComponent label="Organismo" type="text" value="" onChange={() => { console.log("a") }} />]
            },
            {
              isRequired: true,
              fields: [
                <InputComponent label="Organismo" type="text" value="" onChange={() => { console.log("a") }} />,
                <InputComponent label="Organismo" type="text" value="" onChange={() => { console.log("a") }} />,
                <InputComponent label="Organismo" type="text" value="" onChange={() => { console.log("a") }} />]
            }
          ]}/>
        </div>
        <Timeline weekday={"Segunda-feira"} month={"agosto"} year={"2024"} data={timelineData} />
        <Timeline weekday={"Outra-feira"} month={"agosto"} year={"2024"} data={timelineData} />
        <div className="flex flex-wrap gap-4 items-center">
          <ButtonComponent size="lg" color="primary" text="Botão" />
          <ButtonComponent color="primary" variant="solid" text="Solid" />
          <ButtonComponent color="primary" variant="faded" text="faded" />
          <ButtonComponent color="primary" variant="bordered" text="bordered" />
          <ButtonComponent color="primary" variant="light" text="light" />
          <ButtonComponent color="primary" variant="flat" text="flat" />
          <ButtonComponent color="primary" variant="ghost" text="ghost" />
          <ButtonComponent color="primary" variant="shadow" text="shadow" />
        </div>
        <SelectNavigation options={
          [
            "Tela inicial",
            "Criar usuário",
            "Listar usuários",
            "Carregar dados",
            "Listar organismo",
            "Relatórios",
            "Histórico"
          ]}/>
      </div>
    </>
  )
}

export default App
