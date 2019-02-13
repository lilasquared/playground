import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import SyntaxHighlighter from "react-syntax-highlighter"
import stringRenderer from "./react-syntax-highlighter-string-renderer"
import { vs2015 } from "react-syntax-highlighter/dist/styles/hljs"
import styled from "styled-components"

export function useApiData(url, initialData) {
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(false)

  const client = axios.create()

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

const Wrapper = styled.div`
  position: relative;
  min-height: 150px;
  background: black;
`

const LoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${props => (props.loading ? "flex" : "none")};
  align-items: flex-start;
  justify-content: center;
  background: rgba(0, 0, 0, 0.75);
`

const Loading = styled.div`
  margin-top: 100px;
  color: white;
`

const Visualizr = ({ url }) => {
  const { data, loading } = useApiData(url, {})

  return (
    <Wrapper>
      <SyntaxHighlighter
        language="json"
        style={vs2015}
        showLineNumbers
        renderer={stringRenderer(renderHttpString)}
      >
        {JSON.stringify(data, null, 2)}
      </SyntaxHighlighter>
      <LoadingWrapper loading={loading}>
        <Loading>
          <h1>Loading</h1>
        </Loading>
      </LoadingWrapper>
    </Wrapper>
  )
}

export default Visualizr
