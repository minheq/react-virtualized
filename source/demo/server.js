import Application from './Application'
import React from 'react'
import path from 'path'
import ReactDOMServer from 'react-dom/server'
import express from 'express'

const app = express()
const SERVER_PORT = 8080

app.use('/static', express.static(__dirname + '/static'));

app.use('*', (req, res) => {
  res.send(`
    <!doctype html>\n
    <html>\n
    <head>
      <title>react-virtualized</title>
      <meta charset="utf-8">
      <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
      <link type='image/x-icon' rel='shortcut icon'>
      <link rel="stylesheet" type="text/css" href="static/styles.css">
    </head>
    <body>
      <div id="root">
        ${ReactDOMServer.renderToString(<Application req={req.originalUrl} />)}
      </div>
      ${`<script src="static/client.js"></script>`}
    </body>
    </html>
  `)
})

app.listen(SERVER_PORT, error => {
  if (error) console.log(error)
  console.log(`Server started at port ${SERVER_PORT}.`)
})
