import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import useTranslationHook from '../hook/TranslationHook'

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
    <Form>
      <Form.Control
        type='text'
        placeholder={placeholderText ?? t('text.search')}
        value={search}
        onChange={handleSearch}
      />
    </Form>
  )
}

export default SearchBar
