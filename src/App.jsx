import React from "react"
import { Container } from "reactstrap"
import { Route, Redirect, Link } from "react-router-dom"
import MarkupExplorer from "./MarkupExplorer"
import Explorer from "./Explorer"

const redirectToStarwars = () => <Redirect to="/https://swapi.co/api/" />

export default function App() {
  return (
    <Container>
      <Route exact path="/" render={redirectToStarwars} />
      <Route path="/:path(.*)" render={Explorer} />
      <br />
      Good APIs:
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
