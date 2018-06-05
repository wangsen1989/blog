const mongoose = require('mongoose')
const model = require('../model/index.model')
const utils = require('../utils')
const Record = model.getModel('record')
const User = model.getModel('user')

const recordRouter = (Router) => {

    Router.post('/addRecord', (req, res) => {
        //record表create新文章, then => user表更新引用，
        const { _id: editId, title, content } = req.body
        const { username, userid } = req.cookies
        const _id = mongoose.mongo.ObjectId(userid);
        if (!editId) {
            //record表新建文章
            Record.create({
                username,
                userid,
                title,
                content
            }, (err, doc) => {
                if (err) {
                    res.json({ code: '500', message: '服务器内部错误，请稍后重试' })
                }
                else {
                    //user表更新文章引用
                    const newRecord = { recordId: doc._id.toString(), title }
                    User.update({ name: username, _id }, { $push: { records: newRecord } }, (err, document) => {
                        res.json({ code: '000' })
                    });
                }
            })
        } else {
            //编辑
            Record.update({ _id: editId }, {
                $set: {
                    title,
                    content
                }
            }, (err, doc) => {
                if (err) {
                    res.json({ code: '500', message: '服务器内部错误，请稍后重试' })
                }
                else {
                    res.json({ code: '000', data: doc })
                }
            })
        }
    })

}

module.exports = {
    recordRouter
}