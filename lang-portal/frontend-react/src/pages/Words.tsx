import React, { useEffect, useState } from 'react'
import { Word, WordSortKey } from '../services/api'
import WordsTable from '../components/WordsTable'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export default function WordsPage() {
  const [words, setWords] = useState<Word[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortKey, setSortKey] = useState<WordSortKey>('english')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    const fetchWords = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch(
          `${API_BASE_URL}/api/words?sort_by=${sortKey}&order=${sortDirection}`
        )
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setWords(data.words || [])
      } catch (err) {
        console.error('Failed to fetch words:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch words')
      } finally {
        setIsLoading(false)
      }
    }

    fetchWords()
  }, [sortKey, sortDirection])

  const handleSort = (key: WordSortKey) => {
    setSortKey(key)
    setSortDirection(current => current === 'asc' ? 'desc' : 'asc')
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Words List</h1>
      <WordsTable
        words={words}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={handleSort}
        isLoading={isLoading}
        error={error ?? undefined}
      />
    </div>
  )
}