const mongoose = require('mongoose')
const model = require('../model/index.model')
const User = model.getModel('user')
const utils = require('../utils')


const userRouter = (Router) => {


    Router.post('/user', (req, res) => {
        const { name, password } = req.body;
        User.findOne({ name, password }, utils.responseFilter, (err, doc) => {
            if (err) {
                res.json({ code: '500', message: '服务器内部错误，请稍后重试' })
            }
            else {
                if (doc) {
                    res.cookie('userid', doc._id.toString())
                    res.cookie('username', doc.name)
                    res.json({ code: '000', data: doc })
                } else {
                    User.create({ name, password }, utils.responseFilter, (error, document) => {
                        res.cookie('userid', document._id.toString())
                        res.cookie('username', document.name)
                        res.json({ code: '000', data: document })
                    })
                }
            }
        })
    })

    Router.post('/userInfo', (req, res) => {
        let { userid = '' } = req.cookies;
        User.findById(userid, utils.responseFilter, (err, doc) => {
            if (err) {
                res.json({ code: '500', message: '服务器内部错误，请稍后重试' })
            }
            else {
                res.json({ code: '000', data: doc })
            }
        })
    })


}

module.exports = {
    userRouter
}