import React from "react"
import { Container } from "reactstrap"

import Login from "./Login"
import useResource from "./hooks/useResource"
import "./App.css"
import Markup from "./Markup"

function App() {
  const data = useResource("/api/people/1", {})

  return (
    <>
      <Login />
      <Container>
        <Markup only language="json" data={data} />
        <Markup language="html" data={<div />} />
      </Container>
    </>
  )
}

export default App
