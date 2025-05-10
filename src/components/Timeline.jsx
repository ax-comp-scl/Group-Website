import TimelineCard from './TimelineCard'

export default function Timeline(props) {
  return (
    <div className="flex flex-col mx-6 gap-3">
      {props.data.map((d, i) => (
        <TimelineCard
          key={`${i}-${d.created_at}`}
          description={d.description}
          command={d.command}
          finished_at={d.finished_at}
          created_at={d.created_at}
          exitCode={d.exit_code}
          params={d.params}
        />
      ))}
    </div>
  )
}
