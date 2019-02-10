import React, { useContext } from "react"
import Login from "./Login"
import { Context } from "./AuthorizationContext"
import useResource from "./hooks/useResource"
import "./App.css"

const Logout = () => {
  const { unauthorize } = useContext(Context)
  return (
    <>
      <button onClick={unauthorize}>Logout</button>
      <br />
    </>
  )
}

function App() {
  const { authorized } = useContext(Context)
  const data = useResource("/api/people/1", {})

  return (
    <>
      <Login />
      <div className="App">
        <header className="App-header">
          <textarea
            rows="20"
            cols="100"
            value={JSON.stringify(data)}
            readOnly
          />
          <br />
          {authorized && <Logout />}
        </header>
      </div>
    </>
  )
}

export default App
