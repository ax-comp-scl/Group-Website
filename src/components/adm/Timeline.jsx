import TimelineEndIcon from "./TimelineEndIcon";
import TimelineCard from "./TimelineCard";

export default function Timeline(props) {
  return (
    <ul className="timeline timeline-vertical">
      <li>
        <hr />
        <div className="timeline-middle "></div>
        <div className="timeline-start">
          <p className="font-bold text-xl">
            {props.weekday}, {props.month}, {props.year}
          </p>
        </div>
        <hr />
      </li>
      {props.data.map((d, i) => (
        <li key={i}>
          <TimelineCard
            data={d.description}
            username={d.user.username}
            time={d.time}
            date={d.created_at}
            isInsert={d.method}
          />
        </li>
      ))}
      <li>
        <hr />
        <div className="timeline-middle ">
          <TimelineEndIcon />
        </div>
        <hr />
      </li>
    </ul>
  );
}
