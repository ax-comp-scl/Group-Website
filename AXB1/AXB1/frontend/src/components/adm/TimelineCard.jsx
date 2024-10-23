import HistoryCard from "./HistoryCard"
import InsertIcon from "./InsertIcon"
import ExcludeIcon from "./ExcludeIcon"

export default function TimelineCard(props) {
    return (
        <>
            <hr />
            <div className="timeline-middle">
                {props.isInsert ? <InsertIcon/> : <ExcludeIcon/>}
            </div>
            <div className="timeline-end">
                <HistoryCard
                    fasta={props.fasta}
                    username={props.username}
                    time={props.time}
                    date={props.date}
                />
            </div>
            <hr />
        </>
    );
}