const fs = require('fs')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const Router = require('./router/index.router')
const util = require('./utils')



app.use(bodyParser.json())
app.use(cookieParser())

// 静态资源：首页html， css，script，image
app.use(express.static(path.join(__dirname, '../../dist')))

// 用户头像存放地，建在blog项目平级的目录：imageserver目录
const imagesDir = path.join(__dirname, '../../../imageserver/static')
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir)
    console.log("文件目录不存在，已为您自动创建目录:" + imagesDir)
}
app.use('/imageserver', express.static(path.join(__dirname, '../../../imageserver')));

app.use((req, res, next) => {
    console.log(req)
    // 前端browserRouter路由  /record， /user，返回html文件，不校验登录态
    // 所有api/开头的，除了首页/api/article，登录/api/login，不校验登录态，其余都校验
    const whiteNames = ['/record', '/user', '/api/article', '/api/login',]
    if (whiteNames.includes(req.path)) {
        next()
    } else {
        const { accessToken, userid, username } = req.cookies
        // 校验登录态
        if (!username || util.secretSault(userid) !== accessToken) {
            // return res.redirect('/user')
            return res.json({ code: '002', message: 'token身份失效，请重新登录' })
        }
        // 校验通过，走
        next()
    }
})

app.use('/api', Router.Router)

// 前端browserRouter路由/record，/user返回html文件
app.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'))
})


app.listen(9999, () => {
    console.log("server is running at 9999 !")
})
