const fs = require('fs')
const http = require('http')
const path = require('path')
const mongooose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const Router = require('./router/index.router')
const util = require('./utils')

const DB_URL = "mongodb://localhost:27017/blog"
mongooose.connect(DB_URL)
mongooose.connection.on('connected', () => {
    console.log("db connected")
})

app.use(bodyParser.json())
app.use(cookieParser())


app.use((req, res, next) => {
    console.log(req)
    if (req.url === '/api/article' || req.url === '/api/user') {
        next()
    } else {
        const { accessToken, userid, username } = req.cookies
        if (!username || util.secretSault(userid) !== accessToken) {
            // return res.redirect('/user')
            return res.json({ code: '002', message: 'token身份失效，请重新登录' })
        }
        next()
    }
})

app.use('/api', Router.Router)

app.use(express.static(path.join(__dirname, '../../dist')))

app.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'))
})

app.listen(9999, () => {
    console.log("server is running at 9999 !")
})
