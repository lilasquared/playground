import React, { createContext, useState } from "react"
import axios from "axios"
import useLocalStorage from "react-use-localstorage"

export const Context = createContext({})

const setInterceptor = token => {
  const interceptor = axios.interceptors.request.use(config => {
    console.log("Request Interceptor: " + atob(token), "Path: " + config.url)

    config.headers["x-auth-header"] = token
    axios.interceptors.request.eject(interceptor)
    return config
  })

  return interceptor
}

export const AuthorizationContext = props => {
  const [token, setToken] = useLocalStorage("token")

  console.log("AuthorizationContext: " + atob(token))

  const unauthorize = () => setToken("")

  useState(() => {
    setInterceptor(token)
    axios.interceptors.response.use(
      response => {
        const token = response.headers["x-auth-header"]
        setInterceptor(token)
        setToken(token)

        return response
      },
      error => {
        if (error.response.status === 401) {
          unauthorize()
        }
        return error
      }
    )
  })

  const value = {
    token: token,
    authorized: !!token,
    unauthorize,
  }

  return <Context.Provider value={value}>{props.children}</Context.Provider>
}
