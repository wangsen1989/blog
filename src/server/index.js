const fs = require('fs')
const http = require('http')
const path = require('path')
const mongooose = require('mongoose')
const express = require('express')
const app = express()
const Router = require('./router/index.router')

const DB_URL = "mongodb://localhost:27017/blog"
mongooose.connect(DB_URL)
mongooose.connection.on('connected', () => {
    console.log("db connected")
})

app.use(express.static(path.join(__dirname, '../../dist')))

app.use('/api', Router.Router)

app.use('*', (req, res, next) => {
    if (req.baseUrl.indexOf('/api') > -1) {
        next()
    } else {
        res.sendFile(path.join(__dirname, '../../dist/index.html'))
    }
})



app.listen(9999, () => {
    console.log("server is running at 9999 !")
})
