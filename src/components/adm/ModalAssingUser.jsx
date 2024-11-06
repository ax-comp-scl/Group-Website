import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import { Divider } from "@nextui-org/react";
import { Kbd } from "@nextui-org/react";
import UserSearchCard from "./UserSearchCard";
export default function ModalAssingUser(props) {
  return (
    <Modal
      size="xl"
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      isKeyboardDismissDisabled={false}
      classNames={{
        body: "overflow-x-hidden",
        closeButton: "hidden",
      }}
    >
      <ModalContent>
        {
          <div className="flex flex-col bg-[#d6d6d6]">
            <div className="w-full flex bg-[#d6d6d6] items-center justify-between px-2 gap-2">
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              <input
                type="text"
                placeholder="Digite para buscar..."
                className="flex-1 bg-[#d6d6d6] focus:outline-none h-14 text-xl text-gray-600"
              />
              <div>
                <Kbd className="items-center text-center shadow-small rounded-small hidden md:block border-none px-2 py-1 font-semibold text-xs">
                  <span>ESC</span>
                </Kbd>
              </div>
            </div>
            <Divider></Divider>
            <ModalBody className="overflow-y-auto max-h-[60vh]">
              {props.body}
              <UserSearchCard></UserSearchCard>
              <UserSearchCard></UserSearchCard>
              <UserSearchCard></UserSearchCard>
              <UserSearchCard></UserSearchCard>
              <UserSearchCard></UserSearchCard>
              <UserSearchCard></UserSearchCard>
              <UserSearchCard></UserSearchCard>
              <UserSearchCard></UserSearchCard>
              <UserSearchCard></UserSearchCard>
              <UserSearchCard></UserSearchCard>
            </ModalBody>
          </div>
        }
      </ModalContent>
    </Modal>
  );
}
