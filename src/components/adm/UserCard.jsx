import EditIcon from "./EditIcon";
import ExcludeIcon from "./ExcludeIcon";
import { useState } from "react";
import ModalEdit from "./ModalEdit";
import ButtonComponent from "./Button";
import ModalView from "./ModalView";
import ModalOption from "./ModalOption";
import AvatarComponent from "./Avatar";
import InputComponent from "./Input";
import { Kbd } from "@nextui-org/kbd";
import { ViewIconOpened } from "./ViewIconOpened";
import { ViewIconClosed } from "./ViewIconClosed";
import CheckboxComponent from "./Checkbox";

export default function UserCard(props) {
  const [admin, setAdmin] = useState(false);

  let isAdm = false;
  if (props.data.role === "Administrador") isAdm = true;

  const [name, setName] = useState(props.data.name);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(props.data.email);
  const [selected, setSelected] = useState(props.data.role);
  const [isViewOpen, setViewOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isOptionOpen, setOptionOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleViewOpen = () => {
    setViewOpen(true);
  };

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleOptionOpen = () => {
    setOptionOpen(true);
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  function createInputs() {
    return (
      <>
        <InputComponent
          label="Nome"
          type="text"
          value={name}
          onValueChange={setName}
        />
        <InputComponent
          label="Email"
          type="email"
          value={email}
          onValueChange={setEmail}
        />
        <InputComponent
          label="Senha"
          type="password"
          value={password}
          onValueChange={setPassword}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? <ViewIconOpened /> : <ViewIconClosed />}
            </button>
          }
        />
        <CheckboxComponent
          name="Administrador"
          isSelected={admin}
          onValueChange={setAdmin}
        />
      </>
    );
  }

  function createParagraphs() {
    return (
      <>
        <p>Nome: {name}</p>
        <p>Email: {email}</p>
        <p>Papel: {selected}</p>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col bg-[#F5F5F5] z-0 rounded-xl border-2 w-full max-w-sm">
        <div className="flex items-center p-2 justify-between flex-1">
          <div className="flex gap-5 items-center">
            <AvatarComponent size="sm" isDisabled={true} />
            <p className="break-all text-left">
              <span className="font-bold text-lg">{props.data.name}</span>
            </p>
          </div>
          {isAdm && (
            <div>
              <Kbd className="text-[#FF3232]">ADM</Kbd>
            </div>
          )}
        </div>
        <div className="border-t-2"></div>
        <div className="flex-1 flex flex-col items-center gap-5 p-3">
          <ButtonComponent
            icon={<ViewIconOpened />}
            variant="ghost"
            size={props.size}
            color="default"
            text="Visualizar"
            onPress={handleViewOpen}
          />

          <ModalView
            isOpen={isViewOpen}
            onOpenChange={setViewOpen}
            body={createParagraphs()}
            header="Visualizando usuário"
          />

          {!isAdm && (
            <div className="flex gap-5 justify-center">
              <ButtonComponent
                icon={<EditIcon />}
                variant="ghost"
                size={props.size}
                color="default"
                text="Editar"
                onPress={handleEditOpen}
              />

              <ButtonComponent
                icon={<ExcludeIcon className='size-6'/>}
                variant="ghost"
                size={props.size}
                color="default"
                text="Excluir"
                onPress={handleOptionOpen}
              />
              <ModalEdit
                isOpen={isEditOpen}
                onOpenChange={setEditOpen}
                header="Editando usuário"
                body={createInputs()}
              />

              <ModalOption
                isOpen={isOptionOpen}
                onOpenChange={setOptionOpen}
                handleConfirm={async () => {
                  const response = await fetch('', {}) //props.dados
                  const date = await response.json()
                  setOptionOpen(false);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
