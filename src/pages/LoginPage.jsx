import ButtonComponent from "../components/adm/Button";
import InputComponent from "../components/adm/Input";
import embrapa from "../components/adm/logo-embrapa.png";
import { useState } from "react";
import { ViewIconOpened } from "../components/adm/ViewIconOpened";
import { ViewIconClosed } from "../components/adm/ViewIconClosed";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-row bg-[#FFFFFF] rounded-[20px] w-[90%] h-[90%] max-w-full">
          <div className="w-[50%] flex flex-col justify-center items-center p-8">
            <h1 className="text-2xl font-semibold mb-2">Bem vindo</h1>
            <p className="mb-6">Bem vindo ao Machado Genomics</p>
            <div className="flex flex-col w-full items-center gap-5 mb-5">
              <InputComponent
                isRequired={true}
                isInvalid={isInvalid}
                type="email"
                label="Email"
                variant="faded"
                value={username}
                onValueChange={setUsername}
              />
              <InputComponent
                onValueChange={setPassword}
                value={password}
                isInvalid={isInvalid}
                isRequired={true}
                type={open ? "password" : "text"}
                label="Senha"
                variant="faded"
                endContent={
                  <button onClick={() => setOpen(!open)}>
                    {open ? <ViewIconOpened /> : <ViewIconClosed />}
                  </button>
                }
              />
              <ButtonComponent
                text="Entrar"
                color="success"
                className="text-white"
                variant="solid"
                size="lg"
                radius="lg"
                onPress={async () => {
                  try{
                    const token = await loginUser(username, password)
                    if (token){
                      navigate("/history")
                      setIsInvalid(false)
                    }
                    else{
                      setIsInvalid(true)
                    }
                  }
                  catch(e){
                    setIsInvalid(true)
                  }
                }}
              />
            </div>
            <a className="text-sm text-gray-600">
              Não tem cadastro? Contate o administrador
            </a>
          </div>
          <div className="w-[50%] flex justify-center items-center">
            <img src={embrapa} alt="Embrapa Logo" className="w-[95%] h-auto" />
          </div>
        </div>
      </div>
    </>
  );
}
