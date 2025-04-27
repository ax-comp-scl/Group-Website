import { CheckCircle2, XCircle } from 'lucide-react';
import dayjs from 'dayjs'
  
function StatusIndicator({ exitCode }) {
  switch (exitCode) {
    case 0:
      return <CheckCircle2 className="w-5 h-5 text-success" />;
    case 1:
      return <XCircle className="w-5 h-5 text-error" />;
    default:
      return null;
  }
}

export default function TimelineCard(props) {
  const createdAt = dayjs(props.created_at).format('DD/MM/YYYY HH:mm:ss')
  const finishedAt = dayjs(props.finished_at).format('DD/MM/YYYY HH:mm:ss')

  return (
    <div className="relative">
      <div className="absolute right-4 z-[1]">
        <StatusIndicator 
          exitCode={props.exitCode}
          progress={props.progress}
          errorMessage={props.errorMessage}
        />
      </div>
      <div className="card bg-base-100 shadow-sm hover:shadow-md">
        <div className="card-body p-4">
          <div className="flex items-center justify-between">
            <h3 className="card-title text-base-content">{props.description} - ({props.command})</h3>
          </div>
          
          <div className="flex items-center justify-between gap-3 mt-4">

            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm text-base-content/70">
                  {createdAt} • {finishedAt}
                </p>

              </div>
            </div>
          </div>

          <div className="mt-4 space-y-1 text-sm text-base-content/80">
            <p><strong>Nome comum:</strong> {props.params.common_name}</p>
            <p><strong>Comentário:</strong> {props.params.comment}</p>
            <p><strong>Gênero:</strong> {props.params.genus}</p>
            <p><strong>Espécie:</strong> {props.params.species}</p>
            {props.infraspecific_name && (
              <p><strong>Nome infraespecífico:</strong> {props.params.infraspecific_name}</p>
            )}
            <p><strong>Abreviação:</strong> {props.params.abbreviation}</p>
          </div>
          
          {props.status === "failed" && (
            <div className="mt-4">
              <div className="alert alert-error text-sm">
                {props.errorMessage}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}