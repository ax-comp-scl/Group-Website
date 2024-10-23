import TimelineEndIcon from "./TimelineEndIcon"
import TimelineCard from "./TimelineCard"

export default function Timeline(props) {
    return (
        <ul className="timeline timeline-vertical">
            <li>
                <hr />
                <div className="timeline-middle ">
                </div>
                <div className="timeline-start">
                    <p className="font-bold text-xl">{props.weekday}, {props.month}, {props.year}</p>
                </div>
                <hr />
            </li>
            {
                props.data.map((d, i) => <li key={i}> <TimelineCard fasta={d.fasta} username={d.username} time={d.time} date={d.date} isInsert={d.isInsert} /></li>)
            }
            <li>
                <hr />
                <div className="timeline-middle ">
                    <TimelineEndIcon></TimelineEndIcon>
                </div>
                <hr />
            </li>
        </ul>
    )
}