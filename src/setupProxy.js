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

  app.get("/api/explore", async (req, res, next) => {
    try {
      const response = await axios.get(req.query.url)
      res.send(response.data)
    } catch (error) {
      console.log(error)
      res.status(500)
      res.send()
    }
  })

  // app.get("/api/*", async (req, res, next) => {
  //   const expires = new Date(atob(req.get("x-auth-header") || "") || 0)

  //   if (expires < new Date()) {
  //     return res.status(401).send("Not Authorized")
  //   }

  //   try {
  //     const response = await axios.get(`https://swapi.co/${req.originalUrl}`)
  //     res.set("x-auth-header", token())
  //     res.send(response.data)
  //   } catch (error) {
  //     res.set("x-auth-header", token())
  //     res.status(error.response.status)
  //     res.send()
  //   }
  // })
}
