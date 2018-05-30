const model = require('../model/index.model')

const articleRouter = (Router) => {

    Router.get('/article', (req, res) => {
        const Record = model.getModel('record')
        Record.find({}, (err, doc) => {
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
    articleRouter
}