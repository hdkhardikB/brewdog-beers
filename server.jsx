import React from 'react'
import express from 'express'
import { StaticRouter } from 'react-router-dom'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import { renderToString } from 'react-dom/server'
import App from './src/router'
import bodyParser from 'body-parser'
// config
const port = process.env.PORT || 8080
const app = express()

// compression, for sanity
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// add static directory
app.use(express.static('dist'));
app.use('/static', express.static('dist'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

const template = (reactDom) => `
  <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <base href="/">
        <title>Brewdog Beer</title>
        <link rel="stylesheet" href="/browser.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <div id="app">${reactDom}</div>
        <script src="/browser.js"></script>
    </body>
  </html>
`
app.get('*', (req, res) => {
    const context = {};

    // RENDERING
    const jsx = (
        <StaticRouter location={req.url} context={context}>
            <App {... { 'brewdog': req.cookies['brewdog'] }} />
        </StaticRouter>
    )
    const reactDom = renderToString(jsx);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(template(reactDom));
});


// start the app
app.listen(port)
console.log(`App listening on port ${port}`);
