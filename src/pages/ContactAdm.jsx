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

export default function ContactAdm() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      text: "",
    },
  });

  const onSubmit = async (data) => {
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col flex items-center justify-center " 
      style={{ minHeight: '600px' }}>
        
        <div className="w-full h-20">
          <img
            src={loginImg}
            alt="Login header"
            className="w-full h-full object-cover"
          />
        </div>

        
        <div className="p-8">
          
          <div className="flex justify-center mb-6">
            <img
              src={logoEmbrapa}
              alt="Embrapa Logo"
              className="h-16 object-contain "
            />
          </div>

          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
          <div className="py-4">
              <span className="mb-2 text-md">E-mail</span>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Seu e-mail"
                    variant="bordered"
                    radius="sm"
                    className="w-80"
                    isClearable
                    errorMessage={errors.email?.message}
                  />
                )}
              />
            </div>

            <div className="py-4">
                <Controller
                name="text"
                control={control}
                render={({field})=>(
                    <textarea 
                    variant="bordered" 
                    className="mb-2 p-4 text-md w-80 h-40 focus:outline-none border-2 border-gray-300"
                    placeholder="Adicione o motivo de nos contatar..." 
                    class="textarea 
                    textarea-md">

                    </textarea>
                )}
                    
                />
            </div>

            {loginErrorMessage && (
              <p className="text-red-500 text-sm">{loginErrorMessage}</p>
            )}

            <Button type="submit" className="w-full accent-content bg-green-700 text-white">
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}