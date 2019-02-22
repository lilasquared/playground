import React from "react"
import { Link } from "react-router-dom"
import Visualizr from "./Visualizr"
import { InputGroupAddon, InputGroup, Input, Button } from "reactstrap"

const entriesToObject = (acc, [key, value]) => {
  return { ...acc, [key]: value }
}

const getFormData = form => {
  const dataEntriesIterator = new FormData(form).entries()
  const data = Array.from(dataEntriesIterator).reduce(entriesToObject, {})
  return data
}

const handleFormSubmit = history => e => {
  e.preventDefault()
  const { url } = getFormData(e.target)
  history.push("/" + url)
}

export default function Explorer({ match, history, location }) {
  const url = match.params.path + location.search

  return (
    <>
      <h1>
        <Link to="/">API Visualizr</Link>
      </h1>
      <form onSubmit={handleFormSubmit(history)} key={url}>
        <InputGroup>
          <Input name="url" defaultValue={url} />
          <InputGroupAddon addonType="append">
            <Button>Explore</Button>
          </InputGroupAddon>
        </InputGroup>
      </form>
      <br />
      <Visualizr url={url} />
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
    </>
  )
}
