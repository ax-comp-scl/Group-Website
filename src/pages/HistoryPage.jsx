import Header from "../components/Header";
import { Divider } from "@nextui-org/react";
import Timeline from "../components/Timeline";
import StatusFilter from "../components/StatusFilter";
import { DatePicker } from "@nextui-org/date-picker";
import { useState, useEffect } from "react";
import { getData } from "../services/RequestsService";
import { useQuery } from "@tanstack/react-query";

export default function HistoryPage() {
  const [status, setStatus] = useState();
  const [date, setDate] = useState();

  useEffect(() => {
    const loadTimeline = async () => {
      const data = await getData("history/all")
      setTimelineData(data)
    }
    loadTimeline()
  }, [])


  // TODO: acrescentar barra de progresso, status da operação, nome do arquivo e 
  // mensagem de erro (se houver)
  async function fetchHistory() {
    return await getData("history/all")
  }

  const { data, isFetched } = useQuery({
    queryKey: ["history"],
    queryFn: fetchHistory
  })

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header defaultSelectedKeys="Histórico" />
        <div className="flex-1 flex-col">
          <div className="flex justify-end px-12 my-5 gap-x-10">
            <StatusFilter setValue={setStatus} value={status} />
            <DatePicker
              variant="bordered"
              label="Data"
              className="max-w-[284px]"
              value={date}
              onChange={setDate}
            />
          </div>
          <Divider />
          <div className="mt-10 mb-12 flex flex-col gap-10">
            { isFetched && (
              <Timeline
                weekday="Sexta-Feira"
                month="Março"
                year="2024"
                data={data}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
