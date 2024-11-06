import { useState } from "react";
import Header from "../components/adm/Header"
import { Divider } from "@nextui-org/react"
import CalendarComponent from "../components/adm/Calendar";
import DropdownHistoryComponent from "../components/adm/DropdownHistory";
import Timeline from "../components/adm/Timeline";
import StatusFilter from "../components/adm/StatusFilter";
import SelectComponent from "../components/adm/Select";

export default function HistoryPage() {
    const [showCalendar, setShowCalendar] = useState(false)
    const [status, setStatus] = useState();

    const timelineData1 = [
        { data: "Athaliana_transcript.fasta", username: "Adm1", time: "11h30", date: "08/03/2023", isInsert: false },
        { data: "Daucus_carota.fasta", username: "Adm2", time: "11h00", date: "08/03/2023", isInsert: false },
        { data: "Athaliana_transcript.fasta", username: "Adm3", time: "10h00", date: "08/03/2023", isInsert: true }
    ];

    const timelineData2 = [
        { data: "Daucus_carota.fasta", username: "Adm4", time: "16:24", date: "04/03/2023", isInsert: true }
    ];

    return (
        <>
            <div className="flex flex-col h-screen">
                <Header defaultSelectedKeys="Histórico" />
                <div className="flex-1 flex-col">
                    <div className="flex justify-end px-12 my-5 gap-x-10">
                        <StatusFilter />
                        <DropdownHistoryComponent name={"Data"} items={<CalendarComponent />} />
                    </div>
                    <Divider/>
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
    )
}