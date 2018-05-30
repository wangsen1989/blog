const model = require('../model/index.model')
const User = model.getModel('user')

const userRouter = (Router) => {


    Router.post('/user', (req, res) => {
        User.find({ name: 'wangsen' }, (err, doc) => {
            if (err) {
                res.json({ code: '500', message: '服务器内部错误，请稍后重试' })
            }
            else {
                res.json({ code: '000', data: doc })
            }
        })
    })

    Router.post('/register', (req, res) => {

        User.findOne({ name: 'wangsen' }, (err, doc) => {
            if (err) {
                res.json({ code: '500', message: '服务器内部错误，请稍后重试' })
            }
            else {
                if (doc.length > 0) {
                    res.json({ code: '001', message: '已经被注册' })
                }
                else {
                    User.create({ name: 'wangsen' }, (err, doc) => {
                        res.json({ code: '000', data: doc })
                    })
                }
            }
        })
    })

    Router.post('/login', (req, res) => {

        User.findOne({ name: 'wangsen', pwd: '123' }, (err, doc) => {
            if (err) {
                res.json({ code: '500', message: '服务器内部错误，请稍后重试' })
            }
            else {
                if (doc.length > 0) {
                    res.json({ code: '000', data: doc })
                }
                else {
                    res.json({ code: '002', message: '账号或密码错误' })
                }
            }
        })

    })


}

module.exports = {
    userRouter
}