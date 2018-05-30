const model = require('../model/index.model')
const Record = model.getModel('record')

const recordRouter = (Router) => {

    Router.post('/record', (req, res) => {
        Record.find({ name: 'wangsen2' }, (err, doc) => {
            if (err) {
                res.json({ code: '500', message: '服务器内部错误，请稍后重试' })
            }
            else {
                res.json({ code: '000', data: doc })
            }
        })
    })

    Router.post('/submitRecord', (req, res) => {
        //user表push record记录数组，record表create新文章
        Record.create({
            name: 'wangsen2',
            title: '第2篇文章title',
            content: 'wangsen的第2篇文章content',
            comments: ['ok', '666'],
        }, (err, doc) => {
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
    recordRouter
}