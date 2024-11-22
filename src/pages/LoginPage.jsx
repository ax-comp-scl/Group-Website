import loginImg from "../assets/login-page-img.jpg";
import logoEmbrapa from "../assets/logo-embrapa.png";
import React from "react";
import { useState, useMemo } from "react";
import ViewIconOpened from "../components/icons/ViewIconOpened";
import ViewIconClosed from "../components/icons/ViewIconClosed";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@nextui-org/react";
import { loginUser } from "../services/authService";

export default function LoginPage() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (value) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const validatePassword = (value) => value.match(/^[A-Za-z\d@$!%*?&]{5,}$/);

  const isInvalidEmail = useMemo(() => {
    if (email === "") return false;
    return validateEmail(email) ? false : true;
  }, [email]);

  const isInvalidPassword = useMemo(() => {
    if (password === "") return false;
    return validatePassword(password) ? false : true;
  }, [password]);

  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 ">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <div className="h-[100px] mb-4">
            <img
              src={logoEmbrapa}
              alt="img"
              className="h-full hidden rounded-r-2xl md:block object-cover"
            />
          </div>
          <span className="mb-3 text-4xl font-bold">Bem-Vindo</span>
          <span className="mb-8 font-light text-gray-500">
            Acesse sua conta
          </span>
          <div className="py-4">
            <span className="mb-2 text-md">E-mail</span>
            <Input
              type="email"
              placeholder="Seu e-mail"
              variant="bordered"
              radius="sm"
              isClearable
              color={isInvalidEmail ? "danger" : "success"}
              isInvalid={isInvalidEmail}
              errorMessage="Insira um E-mail válido"
              onValueChange={setEmail}
              value={email}
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Senha</span>
            <Input
              type={isVisible ? "text" : "password"}
              placeholder="Sua senha"
              variant="bordered"
              radius="sm"
              color={isInvalidPassword ? "danger" : "success"}
              isInvalid={isInvalidPassword}
              onValueChange={setPassword}
              value={password}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <ViewIconOpened className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <ViewIconClosed className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
          </div>
          <div className="flex justify-end w-full py-4">
            <span className="font-bold text-md border-b-2 border-black hover:border-green-900 hover:text-green-900 cursor-pointer">
              Recuperar senha
            </span>
          </div>
          <Button
            color="default"
            variant="solid"
            radius="small"
            className="text-lg bg-black text-white rounded-lg mb-6 p-2 w-full  hover:bg-green-900 hover:text-white hover:border hover:border-gray-300"
            onPress={async () => {
              try {
                // const token = await loginUser(username, password)
                const user = await loginUser(email, password)
                if (user) {
                  navigate("/admin/history")
                  // setIsInvalid(false)
                }
                else {
                  // setIsInvalid(true)
                }
              }
              catch (e) {
                // setIsInvalid(true)
              }
            }}
          >
            Entrar
          </Button>
          <div className="text-center text-gray-500">
            Não possui cadastro?
            <span className="font-bold text-black border-b-2 border-black hover:border-green-900 hover:text-green-900 cursor-pointer">
              {" "}
              Contate um administrador
            </span>
          </div>
        </div>
        <div className="relative w-[350px]">
          <img
            src={loginImg}
            alt="img"
            className="h-full hidden rounded-r-2xl md:block object-cover"
          />
        </div>
      </div>
    </div>
  );
}
