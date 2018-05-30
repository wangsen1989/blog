const model = require('../model/index.model')
const User = model.getModel('user')

const userRouter = (Router) => {


    Router.post('/user', (req, res) => {
        const { name, password } = req.body;
        User.findOne({ name, password }, (err, doc) => {
            if (err) {
                res.json({ code: '500', message: '服务器内部错误，请稍后重试' })
            }
            else {
                if (doc) {
                    res.cookie('userid', doc._id)
                    res.json({ code: '000', data: doc })
                } else {
                    User.create({ name, password }, (error, document) => {
                        res.cookie('userid', document._id)
                        res.json({ code: '000', data: document })
                    })
                }
            }
        })
    })

}

module.exports = {
    userRouter
}