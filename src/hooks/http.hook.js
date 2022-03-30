import { useCallback, useState } from 'react'

function useHttp() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getData = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

    setLoading(true)

    try {
      const response = await fetch(url, {method, body, headers})

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`)
      }

      const data = await response.json()

      setLoading(false)

      return data
    } catch (error) {
      setLoading(false)
      setError(error.message)
      throw error
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return {loading, error, getData, clearError}
}

export default useHttp

