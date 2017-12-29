const express = require('express')
const app = express()
const https = require('https')
const fs = require('fs')
const port = 3000
const path = require('path')

app.use('/assets', express.static(path.join(__dirname, '/assets/'))) //public

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

const httpsOptions = {
  key: fs.readFileSync(`${__dirname}/key.pem`),
  cert: fs.readFileSync(`${__dirname}/cert.pem`)
}

const server = https.createServer(httpsOptions, app).listen(port, () => {
  console.log('server running at ' + port)
})