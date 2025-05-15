import { DatePicker } from '@nextui-org/date-picker'
import { Divider } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Timeline from '../components/Timeline'
import { getData } from '../services/RequestsService'

export default function HistoryPage() {
  const [date, setDate] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState()

  async function fetchHistory(page=1) {
    const response = await getData(`api/history?page=${page}`)
    return response
  }

  const oneMinuteInMiliseconds = 1 * 1000 * 60;

  const { data, isFetched } = useQuery({
    queryKey: ['history', currentPage],
    queryFn: () => fetchHistory(currentPage),
    refetchInterval: oneMinuteInMiliseconds,
  })

  useEffect(() => {
    if (data?.total_pages) {
      setTotalPage(data.total_pages)
    }
  }, [data])

console.log(data)

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
         
          </div><div className="w-full">
            {isFetched && <Timeline data={data.results} />}
          </div>
          <div className="join flex justify-center mt-10 space-x-1">
          {totalPage > 1 && (
            <>
              <button
                className={`join-item btn ${currentPage === 1 ? 'btn-active' : ''}`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              {currentPage > 4 && <span className="btn btn-disabled">...</span>}

              {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i)
                .filter((page) => page > 1 && page < totalPage)
                .map((page) => (
                  <button
                    key={page}
                    className={`join-item btn ${currentPage === page ? 'btn-active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

              {currentPage < totalPage - 3 && <span className="btn btn-disabled">...</span>}

              {totalPage > 1 && (
                <button
                  className={`join-item btn ${currentPage === totalPage ? 'btn-active' : ''}`}
                  onClick={() => setCurrentPage(totalPage)}
                >
                  {totalPage}
                </button>
              )}
            </>
          )}
        </div>

      </div>
    </>
  )
}
