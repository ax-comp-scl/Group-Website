import dayjs from "dayjs";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

function StatusIndicator({ status, progress }) {
  switch (status) {
    case "I":
      return (
        <div className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 text-info animate-spin" />
          <div className="w-24 bg-base-200 rounded-full h-2">
            <div
              className="bg-info rounded-full h-2 transition-all duration-300"
              style={{ width: `${progress ?? 0}%` }}
            />
          </div>
        </div>
      );
    case "C":
      return <CheckCircle2 className="w-5 h-5 text-success" />;
    case "F":
      return <XCircle className="w-5 h-5 text-error" />;
    default:
      return null;
  }
}

function ParamsViewer({ params }) {
  if (!params) return null;

  return (
    <div className="mt-3 text-sm bg-base-200 p-3 rounded-lg">
      <h4 className="font-semibold mb-2">Parâmetros:</h4>
      <ul className="space-y-1">
        {Object.entries(params).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value ?? <em>null</em>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TimelineCard(props) {
  const formattedTime = dayjs(props.created_at).format("HH:mm");
  const formattedDate = dayjs(props.created_at).format("DD/MM/YYYY");

  return (
    <div className="relative">
      <div className="absolute right-4 z-[1]">
        <StatusIndicator status={props.status} progress={props.progress} />
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
                  <span>{props.user?.username?.charAt(0).toUpperCase() ?? "U"}</span>
                </div>
              </div>
              <div>
                <p className="font-medium">{props.user?.username ?? "Unknown"}</p>
                <p className="text-sm text-base-content/70">
                  {formattedDate} • {formattedTime}
                </p>
              </div>
            </div>

            <span
              className={`badge ${
                props.method === "POST" ? "badge-success" : "badge-error"
              } gap-2`}
            >
              {props.method === "POST" ? "Insert" : "Delete"}
            </span>
          </div>

          {props.status === "F" && props.errorMessage && (
            <div className="mt-4">
              <div className="alert alert-error text-sm">{props.errorMessage}</div>
            </div>
          )}

          <ParamsViewer params={props.params} />
        </div>
      </div>
    </div>
  );
}
