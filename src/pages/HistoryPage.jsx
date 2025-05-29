import { Divider } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Timeline from '../components/Timeline'
import { getData } from '../services/RequestsService'
import InputComponent from '../components/Input'
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { useDebounce } from 'use-debounce'


export default function HistoryPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [inputPage, setInputPage] = useState('1')
  const [orderBy, setOrderBy] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  async function fetchHistory(page, currentOrderBy, currentSearchTerm) {
    let orderingParam = 'created_at';
    if (currentOrderBy === 'descending') {
        orderingParam = '-created_at';
    }

    let url = `api/history?page=${page}&ordering=${orderingParam}`;
    if (currentSearchTerm) {
      url += `&search=${encodeURIComponent(currentSearchTerm)}`;
    }
    
    const response = await getData(url);
    return response;
}

  const fiveSecondsInMiliseconds = 1 * 1000 * 5

  const { data, isFetched } = useQuery({
    queryKey: ['history', currentPage, orderBy, debouncedSearchTerm],
    queryFn: () => fetchHistory(currentPage, orderBy, debouncedSearchTerm),
    refetchInterval: fiveSecondsInMiliseconds,
    keepPreviousData: true,
  });

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
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPage - 1, currentPage + 1)

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
    let pageNum = Number.parseInt(inputPage, 10)
    if (Number.isNaN(pageNum) || pageNum < 1) {
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
          <div className="flex justify-between px-12 my-5 gap-x-10">
            <InputComponent
              type="text"
              label="Pesquisar por palavra-chave"
              variant="faded"
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
            
            <div className="flex items-center justify-center gap-5">
              <span className="text-default-600/80 text-sm">Ordenar por data: </span>
              <div className="flex rounded-md shadow-sm">
                <button 
                  type="button" 
                  className={twMerge(
                    "p-2 border border-gray-300 rounded-l-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500", 
                    orderBy === 'ascending' && "bg-blue-500 text-white border-blue-500"
                  )}
                  onClick={() => {
                    setOrderBy('ascending')
                    setCurrentPage(1)
                  }}    
                >
                  <ArrowDownWideNarrow className={twMerge("size-4", orderBy === 'ascending' ? "text-white" : "text-gray-600")} />
                </button>
                <button 
                  type="button" 
                  className={twMerge(
                    "p-2 border border-gray-300 border-l-0 rounded-r-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500", 
                    orderBy === 'descending' && "bg-blue-500 text-white border-blue-500"
                  )}
                  onClick={() => {
                    setOrderBy('descending')
                    setCurrentPage(1)
                  }}
                >
                  <ArrowUpWideNarrow className={twMerge("size-4", orderBy === 'descending' ? "text-white" : "text-gray-600")} />
                </button>
              </div>
            </div>
          </div>
          <Divider />

          <div className="w-full">
            {isFetched && data.results.length > 0 && <Timeline data={data.results} />}
            {isFetched && data.results.length === 0 && 
              <h3 className="mt-5 text-center text-2xl text-zinc-900/30">
                Sem dados cadastrados.
              </h3>
            }
          </div>

          <div className="relative mt-10 px-12">
            <div className="join flex justify-center space-x-1">
              {totalPage > 1 &&
                getPageNumbers().map((page, index) =>
                  typeof page === 'number' ? (
                    <button
                      key={page}
                      type="button"
                      className={`join-item btn ${currentPage === page ? 'btn-active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ) : (
                    <span key={page} className="btn btn-disabled pointer-events-none">
                      ...
                    </span>
                  )
                )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="pageInput"
                type="text"
                className="input input-bordered w-[5ch] h-[5ch] text-center"
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
