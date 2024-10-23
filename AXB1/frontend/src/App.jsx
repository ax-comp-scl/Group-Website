import Header from './components/adm/Header'
import Timeline from './components/adm/Timeline'
import AccordionComponent from './components/adm/Accordion'
import FileNavbar from './components/adm/FileNavbar'
import SearchMenu from "./components/adm/SearchMenu"
import AdditionalMenu from './components/adm/AdditionalMenu'
import UserCard from './components/adm/UserCard'
import OrganismCard from './components/adm/OrganismCard'
import InputComponent from './components/adm/Input'
import CheckboxComponent from './components/adm/Checkbox'
import ButtonComponent from './components/adm/Button'
import SelectComponent from './components/adm/Select'
// import ExcludeIcon from './components/adm/ExcludeIcon'

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
        {/* <FileNavbar /> */}
        <AdditionalMenu tabs={[
            {
              title: 'Ontologia',
              body: [
                <p>Anotações</p>
              ]
            },
            {
              title: 'Organismo',
              body: [
                <p>Sequência</p>
              ]
            },
            {
              title: 'Publicação',
              body: [
                <p>Publicação</p>
              ]
            },
            {
              title: 'FASTA',
              body: [
                <p>DBxREF</p>
              ]
            },
            {
              title: 'GFF',
              body: [
                <p>DBxREF</p>
              ]
            },
            {
              title: 'Adicional',
              body: [
                <p>DBxREF</p>
              ]
            },
            {
              title: 'Similaridade',
              body: [
                <p>DBxREF</p>
              ]
            }
          ]}
          />
        <SearchMenu />
        <UserCard role="usr" data={dados} />
        <UserCard role="pes" data={dados} />
        <UserCard role="adm" data={dados} />
        <OrganismCard name={"Super organismo"} />
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
        <AdditionalMenu tabs={[
          {
            title: 'Anotações',
            body: [
              <p>Anotações</p>
            ]
          },
          {
            title: 'Sequência',
            body: [
              <p>Sequência</p>
            ]
          },
          {
            title: 'Publicação',
            body: [
              <p>Publicação</p>
            ]
          },
          {
            title: 'DBxREF',
            body: [
              <p>DBxREF</p>
            ]
          },
        ]}
        />
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
        <SelectComponent options={
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
