import { useState, useCallback, useEffect } from 'react'

type PlainObject<O = any> = {[key: string]: O}

export function useLocationQuery<T = PlainObject> (query?: T) {
  
  const [q, setQ] = useState<T>(query || Object.create(null))

  const setQuery = useCallback(() => {
    window.location.search = ''
  }, [])

  useEffect(() => {
    setQ(/*  */window.location.search as any)
  }, [window.location.search])

  return [q, setQuery]
}