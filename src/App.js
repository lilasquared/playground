import React, { useState } from "react"
import {
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
} from "reactstrap"
import { Route, Redirect, withRouter, Link } from "react-router-dom"
import Visualizr from "./Visualizr"
import MarkupExplorer from "./MarkupExplorer"

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
        render={() => <Redirect to="/https://swapi.co/api/" />}
      />
      <Route
        path="/*"
        component={({ match, location }) => {
          const inputUrl = match.params[0] + location.search
          const [url, setUrl] = useState(inputUrl)
          return (
            <>
              <h1>
                <Link to="/">API Visualizr</Link>
              </h1>
              <InputGroup>
                <Input value={url} onChange={e => setUrl(e.data.value)} />
                <InputGroupAddon addonType="append">
                  <ExploreButton url={url} />
                </InputGroupAddon>
              </InputGroup>

              <br />
              <Visualizr url={inputUrl} />
            </>
          )
        }}
      />
      <MarkupExplorer language="html">
        <div className="test">
          <div className="test__component">
            <h1>This is a new heading 2</h1>
          </div>
        </div>
      </MarkupExplorer>
    </Container>
  )
}

export default App
