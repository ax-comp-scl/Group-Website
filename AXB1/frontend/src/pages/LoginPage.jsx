import { Button, Input, Modal } from "@nextui-org/react";
import React from "react";
import embrapa from "../components/adm/logo-embrapa.png";
import InputComponent from "../components/adm/Input";
import ButtonComponent from "../components/adm/Button";
import InputPasswordComponent from "../components/adm/InputPassword";
import InputEmailComponent from "../components/adm/InputEmail";


export default function LoginPage() {
    return (
        <>
            <div className="flex items-center justify-center bg-[#154734] h-screen">
                <div className="flex flex-row bg-[#FFFFFF] rounded-[20px] w-[90%] h-[90%] max-w-full shadow-lg">
                    <div className="w-[50%] flex flex-col justify-center items-center p-8">
                        <h1 className="text-2xl font-semibold mb-2">Bem vindo</h1>
                        <p className="mb-6">Bem vindo ao Machado Genomics</p>
                        <InputEmailComponent placeholder="Email" variant="bordered"/>
                        <InputPasswordComponent placeholder="Senha" variant="bordered"/>
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