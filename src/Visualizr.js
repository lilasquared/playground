import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import SyntaxHighlighter from "react-syntax-highlighter"
import stringRenderer from "./react-syntax-highlighter-string-renderer"
import { vs2015 } from "react-syntax-highlighter/dist/styles/hljs"

function useApiData(url, initialData) {
  const [data, setData] = useState(initialData)

  const client = axios.create()

  useEffect(() => {
    client
      .get("/api/explore", { params: { url } })
      .then(response => setData(response.data))
      .catch(console.error)
  }, [url])

  return data
}

const renderHttpString = ({ key, value }) => {
  const match = value.match('"(http.*)"')
  if (match) {
    return (
      <Link key={key} to={`/${match[1]}`}>
        {value}
      </Link>
    )
  }
  return value
}

const Visualizr = ({ url }) => {
  const data = useApiData(url, {})
  return (
    <>
      <SyntaxHighlighter
        language="json"
        style={vs2015}
        showLineNumbers
        renderer={stringRenderer(renderHttpString)}
      >
        {JSON.stringify(data, null, 2)}
      </SyntaxHighlighter>
    </>
  )
}

export default Visualizr
