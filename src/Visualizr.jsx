import React from "react"
import { Link } from "react-router-dom"
import SyntaxHighlighter from "react-syntax-highlighter"
import stringRenderer from "./react-syntax-highlighter-string-renderer"
import { vs2015 } from "react-syntax-highlighter/dist/styles/hljs"
import styled from "styled-components"
import { useApiData } from "./hooks/useApiData"

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
  background: rgb(30, 30, 30);
`

const LoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${props => (props.loading ? "block" : "none")};
  background: rgba(0, 0, 0, 0.75);
`

const Loading = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
`

const Visualizr = ({ url }) => {
  const { data, loading } = useApiData(url)

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
