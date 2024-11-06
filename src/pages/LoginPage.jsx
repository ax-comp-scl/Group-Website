import ButtonComponent from "../components/adm/Button";
import InputComponent from "../components/adm/Input";
import embrapa from "../components/adm/logo-embrapa.png";
import { useState } from "react";
import { ViewIconOpened } from "../components/adm/ViewIconOpened";
import { ViewIconClosed } from "../components/adm/ViewIconClosed";

export default function LoginPage() {
    const [open, setOpen] = useState(true)

    return (
        <>
        <div className="flex items-center justify-center h-screen">
                <div className="flex flex-row bg-[#FFFFFF] rounded-[20px] w-[90%] h-[90%] max-w-full">
                    <div className="w-[50%] flex flex-col justify-center items-center p-8">
                        <h1 className="text-2xl font-semibold mb-2">Bem vindo</h1>
                        <p className="mb-6">Bem vindo ao Machado Genomics</p>
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
                        <ButtonComponent text="Entrar" color="success" className="text-white" variant="solid" size="lg" radius="lg" />
                        <a className="text-sm text-gray-600">Não tem cadastro? Contate o administrador</a>
                    </div>
                    <div className="w-[50%] flex justify-center items-center">
                        <img src={embrapa} alt="Embrapa Logo" className="w-[95%] h-auto" />
                    </div>
                </div>
            </div>
        </>
    )
}