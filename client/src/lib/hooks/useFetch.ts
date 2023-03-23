import { useState, useEffect } from "react"

type FetchResult<Data> = {
  data: Data | null
  isLoading: boolean
  error: string | null
}

type FetchOptions = {
  method?: string
  headers?: HeadersInit
  body?: BodyInit
}

function useFetch<Data = any>(
  url: string,
  options?: FetchOptions
): FetchResult<Data> {
  const [data, setData] = useState<Data | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)

    const fetchData = async () => {
      try {
        const response = await fetch(url, options)
        const result = await response.json()

        if (isMounted) {
          if (response.ok) {
            setData(result.data)
          } else {
            setError(result.message)
          }

          setIsLoading(false)
        }
      } catch (error) {
        if (isMounted) {
          setError("Something went wrong")
          setIsLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [url, options])

  return { data, isLoading, error }
}

export default useFetch
