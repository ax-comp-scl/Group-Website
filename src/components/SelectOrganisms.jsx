import { Select, SelectItem, Tooltip } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { getData } from "../services/RequestsService";

export default function SelectOrganisms(props) {
    const [organismsOptions, setOrganismsOptions] = useState([])

    useEffect(() => {
    async function getOrganisms(){
      setOrganismsOptions(await getData("api/organism"))
    }
    getOrganisms()
  }, [])

  const isRequired=true
  const label="organism"
  const textOnHover="Species name (eg. Homo sapiens, Mus musculus)"
  const key="organism"

  const selectOrganisms = (
    <Select
      items={organismsOptions}
      label={label}
      className="max-w-xs font-normal"
      isRequired={isRequired}
      variant="bordered"
      onSelectionChange={props.setValue}
    >
      {item => <SelectItem key={item.organism_id}>{`${item.genus} ${item.species}`}</SelectItem>}
    </Select>
  );
  return (
    <>
      {props.textOnHover ? (
        <Tooltip
          content={textOnHover}
          placement="top-start"
          offset={15}
          crossOffset={-250}
          delay={800}
        >
          {selectOrganisms}
        </Tooltip>
      ) : (
        selectOrganisms
      )}
    </>
  );
}
