import TimelineCard from "./TimelineCard";

export default function Timeline({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-8">
        Nenhum histórico encontrado.
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-6 gap-3">
      {data.map((d, i) => (
        <TimelineCard
          key={i}
          description={d.description}
          created_at={d.created_at}
          method={d.method}
          status={d.status}
          progress={d.progress}
          errorMessage={d.errorMessage}
          user={d.user}
          params={d.params}
        />
      ))}
    </div>
  );
}
