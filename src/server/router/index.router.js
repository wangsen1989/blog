const express = require('express')
const Router = express.Router()

const articleRouter = require('./article.router').articleRouter
const recordRouter = require('./record.router').recordRouter
const userRouter = require('./user.router').userRouter

articleRouter(Router)
recordRouter(Router)
userRouter(Router)

module.exports = {
    Router
}