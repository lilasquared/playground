import { useState, useEffect } from "react"
import axios from "axios"

const client = axios.create()

export function useApiData(url, initialData = {}) {
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!url) return
    setLoading(true)

    client
      .get("/api/explore", { params: { url } })
      .then(response => setData(response.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [url])

  return { data, loading }
}
