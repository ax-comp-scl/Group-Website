import AvatarComponent from "./Avatar";
import {
  useCheckbox,
  Chip,
  VisuallyHidden,
  tv,
  Button,
} from "@nextui-org/react";

const checkbox = tv({
  slots: {
    base: "border-default hover:bg-default-200",
    content: "text-default-500",
  },
  variants: {
    isSelected: {
      true: {
        base: "bg-primary-500 hover:bg-primary-400",
        content: "text-primary-foreground",
      },
    },
    isFocusVisible: {
      true: {
        base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
        content: "text-primary-foreground",
      },
    },
  },
});

export default function UserSearchCard() {
  const {
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    defaultSelected: false,
  });

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <div className="h-full">
      <Button className="h-full w-full bg-white rounded-md py-4 px-6 flex gap-10 justify-between items-center bg-content2/50 active:opacity-70 cursor-pointer transition-opacity hover:bg-default-50 transition-all duration-500">
        <div className="flex gap-5 items-center">
          <AvatarComponent size="sm" isDisabled={true} />
          <p className="font-semibold text-lg text-gray-700">
            Usuário interessante
          </p>
        </div>
        <label {...getBaseProps()}>
          <VisuallyHidden>
            <input {...getInputProps()} />
          </VisuallyHidden>
          <Chip
            classNames={{
              base: styles.base(),
              content: styles.content(),
            }}
            color="primary"
            variant="faded"
            {...getLabelProps()}
          >
            Acesso
          </Chip>
        </label>
      </Button>
    </div>
    // <div className="w-full bg-white rounded-md py-4 px-6 flex gap-10 justify-between items-center bg-content2/50 active:opacity-70 cursor-pointer transition-opacity hover:bg-default-50 transition-all duration-500">
    //     <div className="flex gap-5 items-center">
    //         <AvatarComponent  size="sm" isDisabled={true} />
    //         <p>Usuário interessante</p>
    //     </div>
    //     <label {...getBaseProps()}>
    //     <VisuallyHidden>
    //         <input {...getInputProps()} />
    //     </VisuallyHidden>
    //     <Chip
    //         classNames={{
    //         base: styles.base(),
    //         content: styles.content(),
    //         }}
    //         color="primary"
    //         variant="faded"
    //         {...getLabelProps()}
    //     >
    //         Atribuir
    //     </Chip>
    //     </label>
    // </div>
  );
}
