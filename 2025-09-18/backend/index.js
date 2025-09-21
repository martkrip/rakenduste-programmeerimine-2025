const express = require('express')
const app = express()
const port = 8080

app.get('/users', (req, res) => {
  res.send('Hello Martin!')
})
app.get("/users/:id", (req, res) => {
  res.send(req.params)
})

app.get("/users/:userId/books/:bookId", (req, res) => {
  res.send(req.params)
})
app.get("/flights/:from-:to", (req, res) => {
  res.send(req.params)
})

app.post("/users", (req, res) => {
  res.send("Got a POST request")
})
app.put("/users/:id", (req, res) => {
  res.send(req.params)
})

app.delete("/users/:id", (req, res) => {
  res.send(req.params)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})