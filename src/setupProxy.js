const axios = require("axios")
const btoa = require("btoa")
const atob = require("atob")

function token() {
  return btoa(new Date(new Date().getTime() + 300 * 1000))
}

module.exports = app => {
  app.disable("etag")

  app.post("/api/token", async (req, res, next) => {
    res.set("x-auth-header", token())
    res.send()
  })

  app.get("/api/*", async (req, res, next) => {
    const expires = new Date(atob(req.get("x-auth-header") || "") || 0)

    if (expires < new Date()) {
      return res.status(401).send("Not Authorized")
    }

    const response = await axios.get(`https://swapi.co/${req.originalUrl}`)
    res.set("x-auth-header", token())
    res.send(response.data)
  })
}

// fetch('/api/token', { method: 'POST' })
//   .then(r => r.json())
//   .then(data => data.token)
//   .then(token => {
//     fetch('/api/people/1', { headers: { ['X-Auth-Header']: token }})
//     .then(r => r.json())
//     .then(data => console.log(data))
//   })
