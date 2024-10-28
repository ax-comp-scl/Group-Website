import Header from "../components/adm/Header"
import InputComponent from "../components/adm/Input"
import CheckboxComponent from "../components/adm/Checkbox"
import ButtonComponent from "../components/adm/Button"
import {ViewIconOpened} from "../components/adm/ViewIconOpened"
import {ViewIconClosed} from "../components/adm/ViewIconClosed"
import { useState } from "react"

export default function CreateUserPage(){
    const [open, setOpen] = useState(true)
    const [admin, setAdmin] = useState(false)
    
    return(
        <div className="flex flex-col h-screen">
            <Header defaultSelectedKeys="Criar usuário"/> 
            <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-col gap-5 w-4/12 items-center">
                    <InputComponent
                        isRequired={true}
                        type="text"
                        label="Nome"
                        variant="faded"
                    />
                    <InputComponent
                        isRequired={true}
                        type="email"
                        label="Email"
                        variant="faded"
                    />
                    <InputComponent
                        isRequired={true}
                        type={open ? "password" : "text"}
                        label="Senha"
                        variant="faded"
                        endContent={<button onClick={()=>setOpen(!open)}>{open ? (<ViewIconOpened/>) : (<ViewIconClosed/>)}</button>}
                    />
                    <div className="w-7/12">
                        <CheckboxComponent name="Administrador" isSelected={admin} onValueChange={setAdmin}/>
                    </div>
                    
                    <ButtonComponent className="w-2/6" text="Cadastrar" />
                </div>
            </div>
        </div>
    )
}