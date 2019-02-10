import React, { createContext, useEffect, useState } from "react"
import axios from "axios"
import useLocalStorage from "react-use-localstorage"

export const Context = createContext({})

const changeInterceptor = token => {
  console.log("change interceptor: " + token)
  return
}

axios.interceptors.request.use(config => {
  config.headers["x-auth-header"] = localStorage.getItem("token")
  return config
})

export const AuthorizationContext = props => {
  const [token, setToken] = useLocalStorage("token")
  console.log("AuthorizationContext: " + token)
  const unauthorize = () => setToken("")

  useState(() => {
    axios.interceptors.response.use(
      response => {
        setToken(response.headers["x-auth-header"])
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

  // console.log("AuthorizationContext: " + token)

  // axios.interceptors.response.eject()
  // axios.interceptors.request.use(config => {
  //   console.log("interceptor: " + token)
  //   config.headers["x-auth-header"] = token
  //   return config
  // })

  // axios.interceptors.response.eject()
  // axios.interceptors.response.use(
  //   response => {
  //     setToken(response.headers["x-auth-header"])

  //     return response
  //   },
  //   error => {
  //     if (error.response.status === 401) {
  //       unauthorize()
  //     }
  //     return error
  //   }
  // )

  // useEffect(
  //   () => {
  //     if (token) {
  //     }
  //     axios.interceptors.request.eject(interceptor)
  //     setInterceptor(changeInterceptor(token))
  //   },
  //   [token]
  // )

  const value = {
    token,
    authorized: !!token,
    authorize: setToken,
    unauthorize: unauthorize,
  }

  return <Context.Provider value={value}>{props.children}</Context.Provider>
}
