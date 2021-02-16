const express = require('express')
const cookieParser = require('cookie-parser');

const app = express()
const port = 4500

const cookieSecret = 'RANDOM';

app.use(cookieParser(cookieSecret));

app.post('/give-me-cookies', (req, res) => {
    let options = {
        path: '/',
        maxAge: 1000 * 60 * 15, // 15 minutes
        httpOnly: true,
        secure: true,
        signed: false,
        sameSite: 'lax'
    }

    // Set cookie
    res.cookie('TEST', 'COOKIEVALUE', options)
    res.json({message: 'Hello World!'})
})

app.get('/other-request', (req, res) => {
    res.json({message: 'Other request!!!!!'})
})

app.listen(port, () => {
  console.log(`Demo Cookies Server app listening at http://localhost:${port}`)
})
