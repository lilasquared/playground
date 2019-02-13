import React, { useState } from "react"
import ReactDOMServer from "react-dom/server"
import SyntaxHighlighter from "react-syntax-highlighter"
import { vs2015 } from "react-syntax-highlighter/dist/styles/hljs"

import pretty from "pretty"

const Markup = ({ language, data, children, only }) => {
  const [isOpen, setIsOpen] = useState(false)

  const raw = data || children

  function getMarkup() {
    const str = React.isValidElement(raw)
      ? ReactDOMServer.renderToStaticMarkup(raw)
      : raw || ""

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
      <div>{!only && raw}</div>
      <div>
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Hide Markup" : "View Markup"}
        </button>
      </div>
      {isOpen && (
        <SyntaxHighlighter language={language} style={vs2015} showLineNumbers>
          {markup}
        </SyntaxHighlighter>
      )}
    </>
  )
}

export default Markup
