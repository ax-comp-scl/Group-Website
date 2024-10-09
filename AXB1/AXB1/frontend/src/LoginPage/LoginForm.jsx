import React, { useEffect } from 'react';
import Logo from './Logo';
import InputField from './InputField';

function LoginForm() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <section className="flex flex-col w-[50%] max-md:ml-0">
      <div className="flex flex-col mt-20 text-base leading-tight text-center text-black max-md:mt-10">
        <Logo />
        <div className="flex flex-col items-start pl-2 mt-5 w-full text-xl max-md:mt-10">
          <h1 className="text-3xl font-bold">Seja bem-vindo!</h1>

          <p className="mt-3 text-lg font-medium">
            Ao Machado Genomics
          </p>
          <form className="w-full pl-2 mt-12"> 
            <InputField
              label="Email"
              type="email"
              id="email"
              placeholder="fabio@mail.com"
            />
            <InputField
              label="Senha"
              type="password"
              id="password"
              placeholder="●●●●●●●●"
              showPasswordToggle
            />
            <a href="#" className="self-end mt-1.5 font-medium ">
              Esqueceu a senha?
            </a>
            <br />
            <button
              type="submit"
              className="px-16 py-6 mt-10 text-3xl font-bold text-white whitespace-nowrap bg-green-900 rounded-xl max-md:px-5 max-md:mt-10 max-md:ml-1.5 hover:bg-green-700 hover:shadow-lg hover:-translate-y-1 transition duration-200"
            >
              Entrar
            </button>
          </form>
        </div>
        <p className="self-center mt-8 font-medium max-md:mt-1 hover:-translate-y-1 transition duration-200">
          Não tem cadastro? Contate o administrador
        </p>
      </div>
    </section>
  );
}

export default LoginForm;
