import Header from "../components/Header";
import { Divider } from "@nextui-org/react";
import Timeline from "../components/Timeline";
import StatusFilter from "../components/StatusFilter";
import { DatePicker } from "@nextui-org/date-picker";
import { useState, useEffect } from "react";
import { getData } from "../services/RequestsService";

export default function HistoryPage() {
  const timelineData1 = [
    {
      description: "Athaliana_transcript.fasta",
      user: { username: "Rennan Marcile Lazarini" },
      time: "11h30",
      created_at: "08/03/2023",
      method: "POST",
      status: "completed",
      uploadProgress: 100,
      errorMessage: null
    },
    {
      description: "Daucus_carota.fasta",
      user: { username: "Abel Baes Correia" },
      time: "11h00",
      created_at: "08/03/2023",
      method: "DELETE",
      status: "in_progress",
      uploadProgress: 45,
      errorMessage: null
    },
    {
      description: "Athaliana_transcript.fasta",
      user: { username: "Pedro Henrique Aissa" },
      time: "10h00",
      created_at: "08/03/2023",
      method: "POST",
      status: "failed",
      uploadProgress: 0,
      errorMessage: "Upload failed: File format not supported"
    }
  ];

  const [timelineData, setTimelineData] = useState();

  const [status, setStatus] = useState();
  const [date, setDate] = useState();

  useEffect(() => {
    const loadTimeline = async () => {
      const data = await getData("history/all")
      setTimelineData(data)
    }
    loadTimeline()
  }, [])

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
          </div>
        </div>
      </div>
    </>
  );
}
