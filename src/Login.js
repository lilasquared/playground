import React, { useContext, useState } from "react"
import axios from "axios"

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap"

import { Context } from "./AuthorizationContext"

const Logout = () => {
  const { unauthorize } = useContext(Context)
  return (
    <>
      <button className="test" onClick={unauthorize}>
        Logout
      </button>
      <br />
    </>
  )
}

const Login = () => {
  const { authorized } = useContext(Context)
  const { username, setUsername } = useState("")
  const { password, setPassword } = useState("")

  return (
    <>
      <Modal isOpen={!authorized}>
        <ModalHeader>Unauthorized</ModalHeader>
        <ModalBody>
          <Input
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <br />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            block
            onClick={() => {
              axios.post("/api/token")
            }}
          >
            Login
          </Button>
        </ModalFooter>
      </Modal>
      {authorized && <Logout />}
    </>
  )
}

export default Login
