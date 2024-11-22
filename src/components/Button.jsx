import { Button } from "@nextui-org/react";

export default function ButtonComponent(props) {
  return (
    <>
      <Button
        className="max-w-xs"
        startContent={props.icon}
        size={props.size}
        color={props.color}
        variant={props.variant}
        onPress={props.onPress}
      >
        {props.text}
      </Button>
    </>
  );
}
