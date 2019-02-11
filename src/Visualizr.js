import React, { useState, useEffect } from "react"
import axios from "axios"
import SyntaxHighlighter from "react-syntax-highlighter"
import linksRenderer from "./react-syntax-highlighter-links-renderer"
import { vs2015 } from "react-syntax-highlighter/dist/styles/hljs"

function useApiData(url, initialData) {
  const [data, setData] = useState(initialData)

  const client = axios.create()

  useEffect(
    () => {
      client
        .get("/api/explore", { params: { url } })
        .then(response => setData(response.data))
        .catch(console.error)
    },
    [url]
  )

  return data
}

const Visualizr = ({ url }) => {
  const data = useApiData(url, {})
  return (
    <>
      <SyntaxHighlighter
        language="json"
        style={vs2015}
        showLineNumbers
        renderer={linksRenderer}
      >
        {JSON.stringify(data, null, 2)}
      </SyntaxHighlighter>
    </>
  )
}

export default Visualizr
