import React, { useEffect, useState } from 'react'
import useTranslationHook from '../hook/TranslationHook'
import { SearchIcon, XIcon } from 'lucide-react'
import clsx from 'clsx'

interface SearchBarProps {
  onSearch: (searchValue: string) => void
  placeholderText?: string
  className?: string
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholderText, className='' }) => {
  const [search, setSearch] = useState<string>('')
  const [isFocused, setIsFocused] = useState(false)
  const { t } = useTranslationHook()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    setSearch(value)
  }

  const clearSearch = (): void => {
    setSearch('')
  }

  useEffect(() => {
    onSearch(search)
  }, [search, onSearch])

  return (
    <form className={clsx(className,'mb-4')}>
    <div 
      className={`
        bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg h-16 py-2 px-4 flex items-center transition-all duration-100
        ${isFocused 
          ? 'border-colorprimary ring-2 ring-colorprimary/30' 
          : 'border border-gray-400 shadow-sm'}

      `}
    >
      {search ? (
        <XIcon 
          onClick={clearSearch} 
          className='text-colorprimary mr-4 w-5 h-5 cursor-pointer hover:opacity-70' 
        />
      ) : (
        <SearchIcon className='text-colorprimary mr-4 w-5 h-5' />
      )}
      <input
        type='text'
        value={search}
        onChange={handleSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholderText ?? t('text.search')}
        className='outline-none w-full text-gray-800 placeholder-gray-500 text-sm bg-transparent'
      />
    </div>
  </form>
  )
}

export default SearchBar
