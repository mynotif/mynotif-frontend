import React, { useEffect, useState } from 'react'
import useTranslationHook from '../hook/TranslationHook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface SearchBarProps {
  onSearch: (searchValue: string) => void
  placeholderText?: string
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholderText }) => {
  const [search, setSearch] = useState<string>('')
  const { t } = useTranslationHook()
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    setSearch(value)
  }

  useEffect(() => {
    onSearch(search)
  }, [search, onSearch])

  return (

    <>
      <form className='p-4'>
        <div className='bg-white rounded-lg h-16 py-2 px-4 shadow-md flex items-center'>
          <FontAwesomeIcon icon={['fas', 'search']} className='text-colorprimary mr-2' />
          <input
            type='text'
            value={search}
            onChange={handleSearch}
            placeholder={placeholderText ?? t('text.search')}
            className='outline-none w-full text-gray-600 placeholder-gray-500'
          />
        </div>
      </form>
    </>
  )
}

export default SearchBar
