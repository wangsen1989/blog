const mongoose = require('mongoose')
const model = require('../model/index.model')
const User = model.getModel('user')
const _FILTER = {
    password:0,
}

const userRouter = (Router) => {


    Router.post('/user', (req, res) => {
        const { name, password } = req.body;
        User.findOne({ name, password }, _FILTER, (err, doc) => {
            if (err) {
                res.json({ code: '500', message: '服务器内部错误，请稍后重试' })
            }
            else {
                if (doc) {
                    res.cookie('userid', doc._id.toString())
                    res.cookie('username', doc.name)
                    res.json({ code: '000', data: doc })
                } else {
                    User.create({ name, password }, _FILTER, (error, document) => {
                        res.cookie('userid', document._id.toString())
                        res.cookie('username', document.name)
                        res.json({ code: '000', data: document })
                    })
                }
            }
        })
    })

    Router.post('/userInfo', (req, res) => {
        let { name, _id } = req.body;
        _id = mongoose.mongo.ObjectId(_id); 

        User.findOne({ name, _id }, _FILTER, (err, doc) => {
            if (err) {
                res.json({ code: '500', message: '服务器内部错误，请稍后重试' })
            }
            else {
                if (doc) {
                    res.json({ code: '000', data: doc })
                } else {
                    res.json({ code: '001', message: '非法操作，请登录后再试' })
                }
            }
        })
    })


}

module.exports = {
    userRouter
}