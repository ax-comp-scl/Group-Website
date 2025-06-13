import TimelineCard from './TimelineCard';

export default function Timeline(props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-5 max-w-screen-xl mx-auto px-4">
      {props.data.map((d, i) => (
        <TimelineCard
          key={i}
          id={d.id}
          description={d.description}
          command={d.command}
          finishedAt={d.finished_at}
          createdAt={d.created_at}
          exitCode={d.exit_code}
          params={d.params}
          loadData={props.loadData}
        />
      ))}
    </div>
  )
}
