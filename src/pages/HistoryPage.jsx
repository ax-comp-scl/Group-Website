import Header from "../components/adm/Header";
import { Divider } from "@nextui-org/react";
import Timeline from "../components/adm/Timeline";
import StatusFilter from "../components/adm/StatusFilter";
import { DatePicker } from "@nextui-org/date-picker";
import { useState } from "react";

export default function HistoryPage() {
  const timelineData1 = [
    {
      data: "Athaliana_transcript.fasta",
      username: "Adm1",
      time: "11h30",
      date: "08/03/2023",
      isInsert: false,
    },
    {
      data: "Daucus_carota.fasta",
      username: "Adm2",
      time: "11h00",
      date: "08/03/2023",
      isInsert: false,
    },
    {
      data: "Athaliana_transcript.fasta",
      username: "Adm3",
      time: "10h00",
      date: "08/03/2023",
      isInsert: true,
    },
  ];

  const timelineData2 = [
    {
      data: "Daucus_carota.fasta",
      username: "Adm4",
      time: "16:24",
      date: "04/03/2023",
      isInsert: true,
    },
  ];

  const [status, setStatus] = useState();
  const [date, setDate] = useState();

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
            <Timeline
              weekday="Sexta-Feira"
              month="Março"
              year="2024"
              data={timelineData1}
            />
            <Timeline
              weekday="Segunda-Feira"
              month="Março"
              year="2024"
              data={timelineData2}
            />
          </div>
        </div>
      </div>
    </>
  );
}
