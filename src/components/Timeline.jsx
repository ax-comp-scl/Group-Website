import TimelineCard from './TimelineCard'

export default function Timeline(props) {
  return (
    <div className="flex flex-col mx-6 gap-3">
      {props.data.map((d, i) => (
        <TimelineCard
          key={`${i}-${d.created_at}`}
          description={d.description}
          command={d.command}
          createdAt={d.created_at}
          finishedAt={d.finished_at}
          exitCode={d.exit_code}
          params={d.params}
        />
      ))}
    </div>
  )
}
