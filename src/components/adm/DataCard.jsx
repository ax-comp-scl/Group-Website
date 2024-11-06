import ExcludeIcon from "./ExcludeIcon";
import { ViewIconOpened } from "./ViewIconOpened";
import ButtonComponent from "./Button";
import ModalAssingUser from "./ModalAssingUser";
import ModalOption from "./ModalOption";
import { useState } from "react";
import UserSearchCard from "./UserSearchCard";

export default function DataCard(props) {
  const [isViewOpen, setViewOpen] = useState(false);
  const [isOptionOpen, setOptionOpen] = useState(false);

  const handleViewOpen = () => {
    setViewOpen(true);
  };

  const handleOptionOpen = () => {
    setOptionOpen(true);
  };
  return (
    <div className="rounded-lg bg-[#F5F5F5] border-2 max-w-72">
      <p className="m-5 text-center font-bold">{props.name}</p>
      <div className="divider"></div>
      <div className="flex justify-center items-center gap-5 p-3 min-w-72">
        {
         props.type === "organism" &&
         (
          <>
          <ButtonComponent
            icon={<ViewIconOpened />}
            variant="ghost"
            size={props.size}
            color="default"
            text="Usuários"
            onPress={handleViewOpen}
            />
          <ModalAssingUser
            isOpen={isViewOpen}
            onOpenChange={setViewOpen}
            body={<UserSearchCard />}
            />
            </>
          )
        }
        <ButtonComponent
          icon={<ExcludeIcon />}
          variant="ghost"
          size={props.size}
          color="default"
          text="Excluir"
          onPress={handleOptionOpen}
        />
        <ModalOption
          isOpen={isOptionOpen}
          onOpenChange={setOptionOpen}
          handleConfirm={() => {
            setOptionOpen(false);
          }}
        />
      </div>
    </div>
  );
}
