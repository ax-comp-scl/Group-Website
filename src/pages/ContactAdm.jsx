import loginImg from "../assets/login-page-img.jpg";
import logoEmbrapa from "../assets/logo-embrapa.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ViewIconOpened from "../components/icons/ViewIconOpened";
import ViewIconClosed from "../components/icons/ViewIconClosed";
import { loginUser } from "../services/authService";

const loginSchema = z.object({
  email: z.string().email("Insira um E-mail válido"),
  password: z.string().min(5, "A senha deve ter pelo menos 5 caracteres"),
});

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();
  const [loginErrorMessage, setLoginErrorMessage] = useState('')

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const user = await loginUser(data.email, data.password);
      if (user) {
        navigate("/admin/history");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setLoginErrorMessage('Credenciais inválidas')

      setTimeout(() => {
        setLoginErrorMessage('')
      }, 1500)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-emerald-50">
      <div className="flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 ">
        <div className="flex flex-col justify-center p-8 md:p-14">

          <div className="button-back">
            <a href="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            </a>
          </div>
          <div className="h-[100px] mb-4">
            <img
              src={logoEmbrapa}
              alt="img"
              className="h-full hidden rounded-r-2xl md:block object-cover"
            />
          </div>
          <span className="mb-8 font-light">
            Contate um Admin
          </span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-4">
              <span className="mb-2 text-md">E-mail para entrarmos em contato</span>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Seu e-mail"
                    variant="bordered"
                    radius="sm"
                    isClearable
                    color={errors.email ? "danger" : "success"}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                  />
                )}
              />
            </div>
            <div className="py-4">
              <label for="message" class="mb-2 text-md">Sua mensagem</label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <textarea id="message" rows="4" class="block 
                  p-2.5 w-full text-sm text-gray-900 bg-gray-50 
                  rounded-lg border border-gray-300 focus:ring-blue-500 
                  focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
                  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="Digite aqui...">

                  </textarea>
                )}
              />
            </div>
            
            <Button
              type="submit"
              color="default"
              variant="solid"
              radius="small"
              className="text-lg bg-black text-white rounded-lg mb-6 p-2 w-full  hover:bg-green-900 hover:text-white hover:border hover:border-gray-300"
            >
              Enviar
            </Button>
          </form>
          
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