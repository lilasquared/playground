import React from "react"
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
      <Route path="/*" render={props => <Component {...props} />} />
      Good Apis:
      <ul>
        <li>
          <Link to="/https://anapioficeandfire.com/api/">
            https://anapioficeandfire.com/api/
          </Link>
        </li>
        <li>
          <Link to="/https://swapi.co/api">https://swapi.co/api</Link>
        </li>
      </ul>
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

const handleFormSubmit = history => e => {
  e.preventDefault()
  const value = new FormData(e.target).get("url")
  history.push("/" + value)
}

const Component = ({ match, history, location }) => {
  const url = match.params[0] + location.search

  return (
    <>
      <h1>
        <Link to="/">API Visualizr</Link>
      </h1>
      <form onSubmit={handleFormSubmit(history)} key={url}>
        <InputGroup>
          <Input name="url" defaultValue={url} />
          <InputGroupAddon addonType="append">
            <ExploreButton url={url} />
          </InputGroupAddon>
        </InputGroup>
      </form>

      <br />
      <Visualizr url={url} />
    </>
  )
}

export default App
