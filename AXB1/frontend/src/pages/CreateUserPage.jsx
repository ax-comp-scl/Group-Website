import Header from "../components/adm/Header"
import InputComponent from "../components/adm/Input"
import SelectComponent from "../components/adm/Select"
import ButtonComponent from "../components/adm/Button"

export default function CreateUserPage(){
    return(
        <div className="flex flex-col h-screen">
            <Header defaultSelectedKeys="Criar usuário"></Header> 
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
                        type="password"
                        label="Senha"
                        variant="faded"
                    />

                    <SelectComponent 
                        isRequired={true}
                        options={[
                            "Administrador",
                            "Usuário",
                            "Pesquisador"
                          ]}
                        variant="faded"/>
                    
                    <ButtonComponent className="w-2/6" text="Cadastrar" />
                </div>
            </div>
        </div>
    )
}