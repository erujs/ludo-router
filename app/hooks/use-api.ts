import { useState, useEffect } from "react"

interface UseAPIProps<T> {
  data: T | null
  error: string | null
  loading: boolean
}

export function useAPI<T>(url?: string): UseAPIProps<T> {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!url) return

    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(url)
        const json = await response.json()

        if (!response.ok) {
          // this maps fastapi error handling
          setError(`${response.status} | ${json.detail ?? "An unknown error occurred"}`)
          return
        }

        setData(json)
      } catch (error) {
        setError(`NetworkError | ${error instanceof Error ? error.message : "An unknown error occurred"}`)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, error, loading }
}
