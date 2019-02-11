import React, { useState } from "react"
import {
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
} from "reactstrap"
import { Route, Redirect } from "react-router"
import { withRouter } from "react-router-dom"
import Visualizr from "./Visualizr"

const ExploreButton = withRouter(({ history, url }) => (
  <Button
    onClick={() => {
      history.push(`/${url}`)
    }}
  >
    Explore
  </Button>
))

function App() {
  return (
    <Container>
      <Route
        exact
        path="/"
        component={() => <Redirect to="/https://swapi.co/api/" />}
      />
      <Route
        path="/*"
        component={({ match }) => {
          const [url, setUrl] = useState(unescape(match.params[0]))
          return (
            <>
              <h1>API Visualizr</h1>
              <InputGroup>
                <Input value={url} onChange={e => setUrl(e.target.value)} />
                <InputGroupAddon addonType="append">
                  <ExploreButton url={url} />
                </InputGroupAddon>
              </InputGroup>

              <br />
              <Visualizr url={match.params[0]} />
            </>
          )
        }}
      />
    </Container>
  )
}

export default App
