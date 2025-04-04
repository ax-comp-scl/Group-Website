import { Tabs } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (key) => {
    navigate(key);
  };

  return (
    <Tabs
      size="lg"
      radius="sm"
      selectedKey={location.pathname}
      onSelectionChange={handleChange}
      classNames={{
        base: props.base,
        tabList: "flex w-full flex-wrap",
        tab: "flex-1 text-center",
      }}
    >
      {props.options}
    </Tabs>
  );
}
