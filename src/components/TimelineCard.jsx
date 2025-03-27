import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
  
function StatusIndicator({ status, progress, errorMessage }) {
  switch (status) {
    case "in_progress":
      return (
        <div className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 text-info animate-spin" />
          <div className="w-24 bg-base-200 rounded-full h-2">
            <div 
              className="bg-info rounded-full h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      );
    case "completed":
      return <CheckCircle2 className="w-5 h-5 text-success" />;
    case "failed":
      return <XCircle className="w-5 h-5 text-error" />;
    default:
      return null;
  }
}

export default function TimelineCard(props) {
  return (
    <div className="relative">
      <div className="absolute right-4 z-[1]">
        <StatusIndicator 
          status="completed"
          progress={props.progress}
          errorMessage={props.errorMessage}
        />
      </div>
      <div className="card bg-base-100 shadow-sm hover:shadow-md">
        <div className="card-body p-4">
          <div className="flex items-center justify-between">
            <h3 className="card-title text-base-content">{props.description}</h3>
          </div>
          
          <div className="flex items-center justify-between gap-3 mt-4">

            <div className="flex items-center gap-2">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-10">
                  <span>{props.username.charAt(0)}</span>
                </div>
              </div>
              <div>
                <p className="font-medium">{props.username}</p>
                <p className="text-sm text-base-content/70">
                  {props.time} • {props.date}
                </p>

              </div>
            </div>
              <span className={`badge ${props.method === "POST" ? "badge-success" : "badge-error"} gap-2`}>
              {props.method === "POST" ? "Insert" : "Delete"}
            </span>
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