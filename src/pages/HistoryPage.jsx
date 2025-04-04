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
      user: { username: "Adm1", },
      time: "11h30",
      created_at: "08/03/2023",
      method: false,
    },
    {
      description: "Daucus_carota.fasta",
      user: { username: "Adm2", },
      time: "11h00",
      created_at: "08/03/2023",
      method: false,
    },
    {
      description: "Athaliana_transcript.fasta",
      user: { username: "Adm3", },
      time: "10h00",
      created_at: "08/03/2023",
      method: true,
    },
  ];

  const timelineData2 = [
    {
      description: "Daucus_carota.fasta",
      user: { username: "Adm4" },
      time: "16:24",
      created_at: "04/03/2023",
      method: true,
    },
  ];

  const timelineExampleData = [
    {
      "id": 0,
      "user": {
        "id": 0,
        "username": ".9",
        "email": "user@example.com",
        "first_name": "string",
        "last_name": "string",
        "is_staff": true
      },
      "description": "string",
      "method": "string",
      "created_at": "2024-11-12T22:56:39.762Z"
    },
  ]

  const [timelineData, setTimelineData] = useState();

  const [status, setStatus] = useState();
  const [date, setDate] = useState();

  useEffect(() => {
    const loadTimeline = async () => {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          "Authorization": `Token ${token}`,
          "accept": "application/json"
        }
      }
      const data = await getData("history/all", config)
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
