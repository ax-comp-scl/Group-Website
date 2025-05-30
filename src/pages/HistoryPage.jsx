import { DatePicker } from '@nextui-org/date-picker'
import { Divider } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Timeline from '../components/Timeline'
import { getData } from '../services/RequestsService'

export default function HistoryPage() {
  const [date, setDate] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [inputPage, setInputPage] = useState('1')

  async function fetchHistory(page = 1) {
    const response = await getData(`api/history?page=${page}`)
    return response
  }

  const fiveSecondsInMiliseconds = 1 * 1000 * 5

  const { data, isFetched } = useQuery({
    queryKey: ['history', currentPage],
    queryFn: () => fetchHistory(currentPage),
    refetchInterval: fiveSecondsInMiliseconds,
  })

  useEffect(() => {
    if (data?.total_pages) {
      setTotalPage(data.total_pages)
    }
  }, [data])

  useEffect(() => {
    setInputPage(currentPage.toString())
  }, [currentPage])

  function getPageNumbers() {
    const pages = []
    if (totalPage <= 5) {
      for (let i = 1; i <= totalPage; i++) pages.push(i)
    } else {
      pages.push(1)
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPage - 1, currentPage + 1)

      if (start > 2) pages.push('start-ellipsis')
      for (let i = start; i <= end; i++) pages.push(i)
      if (end < totalPage - 1) pages.push('end-ellipsis')
      pages.push(totalPage)
    }
    return pages
  }

  function handleInputPageChange(e) {
    const val = e.target.value
    if (/^\d*$/.test(val)) {
      setInputPage(val)
    }
  }

  function handleInputPageConfirm() {
    let pageNum = parseInt(inputPage, 10)
    if (isNaN(pageNum) || pageNum < 1) {
      pageNum = 1
    } else if (pageNum > totalPage) {
      pageNum = totalPage
    }
    setCurrentPage(pageNum)
    setInputPage(pageNum.toString())
  }

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

          <div className="w-full">
            {isFetched && <Timeline data={data.results} />}
          </div>

          <div className="relative mt-10 px-12">
            <div className="join flex justify-center space-x-1">
              {totalPage > 1 &&
                getPageNumbers().map((page, index) =>
                  typeof page === 'number' ? (
                    <button
                      key={index}
                      className={`join-item btn ${currentPage === page ? 'btn-active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ) : (
                    <span key={index} className="btn btn-disabled pointer-events-none">
                      ...
                    </span>
                  )
                )}
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center space-x-2">
              <input
                id="pageInput"
                type="text"
                className="input input-bordered w-[6ch] text-center"
                value={inputPage}
                onChange={handleInputPageChange}
                onBlur={handleInputPageConfirm}
                onKeyDown={(e) => e.key === 'Enter' && handleInputPageConfirm()}
              />
              <span>/ {totalPage}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
