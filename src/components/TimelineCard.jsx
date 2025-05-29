import dayjs from 'dayjs';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';

function StatusIndicator({ exitCode }) {
  switch (exitCode) {
    case 0:
      return <CheckCircle2 className="w-5 h-5 text-success" />
    case 1:
      return <XCircle className="w-5 h-5 text-error" />
    default:
      return <Loader2 className="w-5 h-5 text-info animate-spin" />
  }
}

export default function TimelineCard(props) {

  // ? como fazer "certo" ??
  const createdAt = dayjs(props.createdAt).subtract(3, 'hours')
  const finishedAt = dayjs(props.finishedAt).subtract(3, 'hours')

  return (
    <div className="relative">
      <div className="absolute right-4 z-[1] mt-2.5">
        <StatusIndicator exitCode={props.exitCode} />
      </div>
      <div className="card bg-gray-200 shadow-sm hover:shadow-md">
        <div className="card-body p-4">
          <div className="flex items-center justify-center">
            <h3 className="card-title text-base-content text-center">
              {props.command} - ({props.description})
            </h3>
          </div>

          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm text-base-content/70">
                  {createdAt.isValid() ? createdAt.format('DD/MM/YYYY HH:mm:ss') : ''}
                  {' • '}
                  {finishedAt.isValid() ? finishedAt.format('DD/MM/YYYY HH:mm:ss') : 'Não finalizado'}
                </p>
              </div>
            </div>
          </div>
          {props.status === 'failed' && (
            <div className="mt-4">
              <div className="alert alert-error text-sm">
                {props.errorMessage}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
