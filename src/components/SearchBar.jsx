import { Input } from "@nextui-org/react";
import ButtonComponent from "./Button";
import SearchIcon from "./icons/SearchIcon";
import { Divider } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

export default function SearchBar(props) {
  return (
    <>
      <div
        className={twMerge("flex items-center mt-10 px-10", props.className)}
      >
        <div className="flex items-center gap-5 flex-1">
          <Input
            label="Buscar"
            isClearable
            radius="lg"
            className="max-w-lg"
            onValueChange={props.onValueChange}
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-md",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focus=true]:bg-default-200/50",
                "dark:group-data-[focus=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            placeholder="Digite para buscar..."
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400               pointer-events-none flex-shrink-0" />
            }
          />
        </div>
        {props.children}
      </div>
      <Divider />
    </>
  );
}
