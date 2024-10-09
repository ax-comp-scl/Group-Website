import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import InputField from "./InputField";
import ValidateLogin from "./ValidateLogin";

function LoginForm() {
  const [email,setEmail] = useState("");
  const [senha,setSenha] = useState("");
  const [error, setError] = useState(false);
  
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ValidateLogin(email, senha) === false) {
      setError(true);
      console.log(error);
    };
    setError(false)
  };

  return (
    <section className="flex flex-col w-[35%] max-md:ml-0 max-md:w-[90%] max-md:mx-auto">
      <div className="flex flex-col mt-1 text-base leading-tight text-center text-black max-md:mt-10 max-md:space-y-6">
        <Logo />
        <div className="flex flex-col items-start pl-1 w-full text-xl max-md:mt-10 max-md:space-y-4">
          <h1 className="text-3xl font-bold max-md:text-2xl">Bem-vindo</h1>

          <p className="mt-3 text-sm font-medium max-md:mt-2 max-md:text-base">
            Bem-vindo ao Machado Genomics
          </p>
          <form className="w-full mt-5 text-base font-medium max-md:space-y-4" onSubmit={handleSubmit}>
            <InputField
              label="E-mail"
              type="email"
              id="email"
              placeholder="Insira o seu e-mail"
              value={email}
              setField = {setEmail}
              error = {error}
            />
            <InputField
              label="Senha"
              type="password"
              id="password"
              placeholder="Insira a sua senha"
              showPasswordToggle
              value={senha}
              setField = {setSenha}
              error = {error}
            />
            <div className="flex flex-col">
              <a href="#" className="mt-1.5 font-light text-base underline text-right max-md:mt-3">
                Esqueceu a senha?
              </a>
            </div>
            <br />
            <button
              type="submit"
              className="w-full px-16 py-4 text-1xl font-bold text-white whitespace-nowrap bg-[#154735] rounded-xl max-md:px-5 max-md:mt-10 max-md:ml-1.5 hover:bg-[#0B6C47] hover:shadow-lg hover:-translate-y-1 transition duration-200"
            >
              Entrar
            </button>
          </form>
        </div>
        <p className="self-center mt-3 font-medium hover:-translate-y-1 transition duration-200 underline max-md:mt-4">
          Não tem cadastro? Contate o administrador
        </p>
      </div>
    </section>
  );
}

export default LoginForm;
