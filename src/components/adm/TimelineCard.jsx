import HistoryCard from "./HistoryCard";
import InsertIcon from "./InsertIcon";
import ExcludeIcon from "./ExcludeIcon";

export default function TimelineCard(props) {
  return (
    <>
      <hr />
      <div className="timeline-middle">
        {props.isInsert ? (
          <InsertIcon className="size-6" />
        ) : (
          <ExcludeIcon className="size-6" />
        )}
      </div>
      <div className="timeline-end">
        <HistoryCard
          data={props.data}
          username={props.username}
          time={props.time}
          date={props.date}
        />
      </div>
      <hr />
    </>
  );
}
