import dayjs from 'dayjs';
import { div } from 'framer-motion/client';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';

function StatusIndicator({ exitCode }) {
  switch (exitCode) {
    case 0:
      return <CheckCircle2 className="w-7 h-7 text-success" />
    case 1:
      return <XCircle className="w-7 h-7 text-error" />
    default:
      return <Loader2 className="w-7 h-7 text-info animate-spin" />
  }
}

export default function TimelineCard(props) {


  const createdAt = dayjs(props.createdAt).subtract(3, 'hours');
  const monthNameCreated = createdAt.format('MMMM'); 
  const yearCreated = createdAt.format('YYYY');     
  const dayCreated = createdAt.format('D');         
  const timeCreated = createdAt.format('HH:mm');  


  const finishedAt = dayjs(props.finishedAt).subtract(3, 'hours');
  const monthNameFinished = finishedAt.format('MMMM'); 
  const yearFinished = finishedAt.format('YYYY');     
  const dayFinished = finishedAt.format('D');         
  const timeFinished = finishedAt.format('HH:mm');   

  return (

    <div className="bg-white text-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-xl mx-auto">

      <div className="flex justify-between text-sm text-gray-500 mb-4">
        <div className="text-left">
          <h2 className="font-semibold">{dayCreated} {monthNameCreated}, {yearCreated}</h2>
          <p>{timeCreated}</p>
        </div>

        <div className="relative text-center">
          <div className="absolute -top-1/2 left-1/2 transform -translate-x-1/2 w-full">
            <StatusIndicator exitCode={props.exitCode} />
          </div>
        </div>

        <div className="text-right">
          <h2 className="font-semibold">{dayFinished} {monthNameFinished}, {yearFinished}</h2>
          <p>{timeFinished}</p>
        </div>
      </div>

      <div className="bg-[rgb(249,249,249)] p-4 rounded-xl text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{props.command}</h3>
        <p className="text-sm text-gray-600">{props.description}</p>
      </div>

    </div>

  )
}

