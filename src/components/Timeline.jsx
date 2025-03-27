import TimelineCard from "./TimelineCard";

export default function Timeline(props) {
  return (
    <div className="flex flex-col mx-6 gap-3">
      {props.data.map((d, i) => (
          <TimelineCard
            key={i}
            description={d.description}
            username={d.user.username}
            time={d.time}
            date={d.created_at}
            method={d.method}
          />
      ))}
    </div>
  );
}
