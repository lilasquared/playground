import { useContext, useState, useEffect } from "react"
import axios from "axios"
import { Context } from "../AuthorizationContext"

export default (url, initialData) => {
  const { token, authorized } = useContext(Context)
  const [data, setData] = useState(initialData)

  useEffect(
    () => {
      console.log({ token })
      if (!authorized) return

      console.log("get people")
      axios.get(url).then(response => setData(response.data))
    },
    [url, authorized]
  )

  return data
}
