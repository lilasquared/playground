import React from "react"
import ReactDOMServer from "react-dom/server"
import SyntaxHighlighter from "react-syntax-highlighter"
import { vs2015 } from "react-syntax-highlighter/dist/styles/hljs"

import pretty from "pretty"

const Markup = ({ language, data, only }) => {
  function getMarkup() {
    const str = React.isValidElement(data)
      ? ReactDOMServer.renderToStaticMarkup(data)
      : data || ""

    switch (language) {
      case "html":
        return pretty(str)
      case "json":
        return JSON.stringify(str, null, 2)
      default:
        return str
    }
  }

  const markup = getMarkup()
  return (
    <>
      {!only && data}
      <SyntaxHighlighter language={language} style={vs2015} showLineNumbers>
        {markup}
      </SyntaxHighlighter>
    </>
  )
}

export default Markup
