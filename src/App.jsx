import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Explorer from "./Explorer"
import Studio from "./Studio"

const redirectToStarwars = () => <Redirect to="/https://swapi.co/api/" />

export default function App() {
  return (
    <Switch>
      <Route exact path="/" render={redirectToStarwars} />
      <Route exact path="/studio" component={Studio} />
      <Route path="/:path(.*)" component={Explorer} />
    </Switch>
  )
}
