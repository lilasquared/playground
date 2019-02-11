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
        component={({ match, location }) => {
          const [url, setUrl] = useState(match.params[0] + location.search)
          return (
            <>
              <h1>API Visualizr</h1>
              <InputGroup>
                <Input value={url} onChange={e => setUrl(e.data.value)}/>
                <InputGroupAddon addonType="append">
                  <ExploreButton url={url} />
                </InputGroupAddon>
              </InputGroup>

              <br />
              <Visualizr url={url} />
            </>
          )
        }}
      />
    </Container>
  )
}

export default App
