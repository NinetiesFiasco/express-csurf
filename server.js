const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const csrf = require('csurf')


const port = 3000

const csrfProtection = csrf({cookie: true})

const app = express()


app.use(express.static(path.join(__dirname, 'dist') ))

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.get('/first', (req, res) => {
  res.send('First query')
})
app.get('/second', csrfProtection, (req, res) => {
  res.json({csrfToken: req.csrfToken()})
})
app.post('/third', csrfProtection, (req, res) => {
  res.send('Third query')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})