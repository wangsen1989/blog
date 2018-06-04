const model = require('../model/index.model')

const articleRouter = (Router) => {

    Router.post('/article', (req, res) => {
        const Record = model.getModel('record')
        const { pageNo = 0, pageSize = 10 } = req.body
        Record.find({}, { content: 0 }, (err, doc) => {
            if (err) {
                res.json({ code: '500', message: '服务器内部错误，请稍后重试' })
            }
            else {
                res.json({ code: '000', data: doc })
            }
        })
            .sort({ _id: -1 })
            .limit(10)
            .skip(pageNo * pageSize)
    })

    Router.post('/articleDetail', (req, res) => {
        const Record = model.getModel('record')
        const { artId } = req.body
        Record.findById(artId, (err, doc) => {
            if (err) {
                res.json({ code: '500', message: '服务器内部错误，请稍后重试' })
            }
            else {
                res.json({ code: '000', data: doc })
            }
        })
    })

    Router.post('/submitComment', (req, res) => {
        const Record = model.getModel('record')
        const { _id, comment } = req.body
        Record.update({ _id }, { $push: { comments: comment } }, (err, doc) => {
            res.json({ code: '000' })
        });
    })




}

module.exports = {
    articleRouter
}