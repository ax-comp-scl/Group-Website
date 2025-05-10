import AvatarComponent from './Avatar.jsx'

export default function HistoryCard(props) {
  return (
    <div className="flex flex-col bg-[#F5F5F5] rounded-xl rounded-xl border-2 w-full max-w-md min-w-80">
      <div className="flex items-center p-2">
        <p className="break-all text-left">
          <span className="font-bold">{props.description}</span>
        </p>
      </div>
      <div className="border-t-2" />
      <div className="flex-1 flex items-center gap-5 p-3">
        <AvatarComponent size="md" isDisabled={true} />
        <p className="break-all text-left">
          <span className="font-semibold">{props.username}</span>
          <span className="font-medium"> - {props.time} </span>({props.date})
        </p>
      </div>
    </div>
  )
}
