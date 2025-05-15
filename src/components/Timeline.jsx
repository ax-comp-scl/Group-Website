import TimelineCard from './TimelineCard'

export default function Timeline(props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-5 max-w-screen-xl mx-auto px-4">
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
