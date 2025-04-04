import EditIcon from "./icons/EditIcon";
import ExcludeIcon from "./icons/ExcludeIcon";
import { useState } from "react";
import ModalEdit from "./ModalEdit";
import ButtonComponent from "./Button";
import ModalView from "./ModalView";
import ModalOption from "./ModalOption";
import AvatarComponent from "./Avatar";
import InputComponent from "./Input";
import { Kbd } from "@nextui-org/kbd";
import ViewIconOpened from "./icons/ViewIconOpened";
import ViewIconClosed from "./icons/ViewIconClosed";
import CheckboxComponent from "./Checkbox";
import { deleteData, putData } from "../services/RequestsService";

export default function UserCard(props) {
  const [username, setUsername] = useState(props.data.username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(props.data.email);
  const [isStaffCheck, setIsStaffCheck] = useState(props.data.is_staff);
  const [isStaff, setIsStaff] = useState(props.data.is_staff);
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
          value={username}
          onValueChange={setUsername}
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
          isSelected={isStaffCheck}
          onValueChange={setIsStaffCheck}
        />
      </>
    );
  }

  function createParagraphs() {
    return (
      <>
        <p>Nome: {username}</p>
        <p>Email: {email}</p>
        <p>Papel: {isStaff ? "Administrador" : "Usuário"}</p>
      </>
    );
  }

  const handleExclude = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const config = {
        headers: {
          Authorization: `Token ${token}`,
        }
      }
      const id = props.data.id
      const data = await deleteData(`account/${id}`, config)
      props.loadData()

    }
    catch (error) {
      setIsInvalid(true)
    }
  }

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const config = {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
          "accept": "application/json"
        }
      }
      
      const data = await putData(`account/${props.data.id}`, { username, email, password, "is_staff": isStaffCheck }, config)
      setIsStaff(isStaffCheck)
    }
    catch (error) {
      setIsInvalid(true)
    }
  }

  return (
    <>
      <div className="flex flex-col bg-[#F5F5F5] z-0 rounded-xl border-2 w-full max-w-sm">
        <div className="flex items-center p-2 justify-between flex-1">
          <div className="flex gap-5 items-center">
            <AvatarComponent size="sm" isDisabled={true} />
            <p className="break-all text-left">
              <span className="font-bold text-lg">{username}</span>
            </p>
          </div>
          {isStaff && (
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

          {!isStaff && (
            <div className="flex gap-5 justify-center">
              <ButtonComponent
                icon={<EditIcon />}
                variant="ghost"
                color="default"
                text="Editar"
                onPress={handleEditOpen}
              />

              <ButtonComponent
                icon={<ExcludeIcon className='size-6' />}
                variant="ghost"
                color="default"
                text="Excluir"
                onPress={handleOptionOpen}
              />
              <ModalEdit
                isOpen={isEditOpen}
                onOpenChange={setEditOpen}
                header="Editando usuário"
                body={createInputs()}
                handleEdit={handleEdit}
              />

              <ModalOption
                isOpen={isOptionOpen}
                onOpenChange={setOptionOpen}
                handleConfirm={() => {
                  handleExclude()
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
