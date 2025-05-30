import { useEffect, useState, useCallback } from 'react'
import { useDebounce } from 'use-debounce'
import DataCard from '../components/DataCard'
import DataSearchBar from '../components/DataSearchBar'
import Header from '../components/Header'
import { api } from '../lib/axios'
import { getUser } from '../services/userService'

export default function ListDataPage() {
  const user = getUser()

  const [searchValue, setSearchValue] = useState('')
  const [resultList, setResultList] = useState([])
  const [allDataList, setAllDataList] = useState([])
  const [selectedKey, setSelectedKey] = useState('Organism')
  const [dataType, setDataType] = useState('organism')
  const [url, setUrl] = useState('organism')

  const [debounce] = useDebounce(searchValue, 200)

  const handleSearch = useCallback(() => {
    if (debounce) {
      setResultList(
        allDataList.filter(organism =>
          organism.genus.toLowerCase().includes(debounce.toLowerCase())
        )
      )
    } else setResultList([])
  }, [debounce, allDataList])

  useEffect(() => {
    handleSearch()
  }, [handleSearch])

  const urls = {
    Ontology: {
      type: 'ontology',
      url: 'ontology',
    },
    Organism: {
      type: 'organism',
      url: 'organism',
    },
    Publication: {
      type: 'publication',
      url: 'publication',
    },
    File: { type: 'file', url: 'file' },
    'Feature annotation': {
      type: 'feature_annotation',
      url: 'feature-annotation',
    },
    Analysis: {
      type: 'analysis',
      url: 'analysis',
    },
  }

  const admOptions = [
    'Ontology',
    'Organism',
    'Publication',
    'File',
    'Feature annotation',
    'Analysis',
  ]

  const userOptions = ['Organism']

  useEffect(() => {
    if (selectedKey && urls[selectedKey.currentKey]) {
      setDataType(urls[selectedKey.currentKey].type)
      setUrl(urls[selectedKey.currentKey].url)
    }
    loadData()
  }, [selectedKey])

  const loadData = useCallback(async () => {
    const data = await api.post(`/${url}`)
    setAllDataList(data)
  }, [url])

  useEffect(() => {
    if (searchValue) loadData()
  }, [searchValue, loadData])

  return (
    <div className="flex flex-col h-screen">
      <Header defaultSelectedKeys="Listar dados" />
      <div className="flex flex-1 flex-col gap-10">
        <DataSearchBar
          defaultSelectedKeys="Organism"
          setValue={setSelectedKey}
          onValueChange={setSearchValue}
          onPress={handleSearch}
          options={user.is_staff ? admOptions : userOptions}
        />
        <div className="px-10 mb-12">
          {searchValue === '' ? (
            <div className="flex items-center justify-center text-zinc-400 font-semibold">
              <p>Digite para buscar...</p>
            </div>
          ) : resultList.length === 0 ? (
            <div className="flex items-center justify-center break-all text-zinc-400 font-semibold">
              <p>{`Nenhum resultado foi encontrado para "${searchValue}"`}</p>
            </div>
          ) : (
            <div className="grid grid-cols-5 justify-items-center gap-5">
              {resultList.map((e, i) => (
                <DataCard
                  type={dataType}
                  data={e}
                  key={url}
                  loadData={loadData}
                  url={url}
                  isStaff={user.is_staff}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
