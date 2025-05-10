import { DatePicker } from '@nextui-org/date-picker'
import { Divider } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Header from '../components/Header'
import Timeline from '../components/Timeline'
import { getData } from '../services/RequestsService'

export default function HistoryPage() {
  const [date, setDate] = useState()

  async function fetchHistory() {
    const response = await getData('api/history')
    return response
  }

  const { data, isFetched } = useQuery({
    queryKey: ['history'],
    queryFn: fetchHistory,
    refetchInterval: 1500,
  })

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header defaultSelectedKeys="Histórico" />
        <div className="flex-1 flex-col">
          <div className="flex justify-end px-12 my-5 gap-x-10">
            <DatePicker
              variant="bordered"
              label="Data"
              className="max-w-[284px]"
              value={date}
              onChange={setDate}
            />
          </div>
          <Divider />
          <div className="mt-10 mb-12 flex flex-col gap-10">
            {isFetched && <Timeline data={data} />}
          </div>
        </div>
      </div>
    </>
  )
}
