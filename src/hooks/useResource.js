import { useContext, useState, useEffect } from "react"
import axios from "axios"
import { Context } from "../AuthorizationContext"

export default (url, initialData) => {
  const { authorized } = useContext(Context)
  const [data, setData] = useState(initialData)

  useEffect(
    () => {
      if (!authorized) return

      axios
        .get(url)
        .then(response => setData(response.data))
        .catch(console.log)
    },
    [url, authorized]
  )

  return data
}
