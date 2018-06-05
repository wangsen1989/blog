const model = require('../model/index.model')
const utils = require('../utils')
const Record = model.getModel('record')
const User = model.getModel('user')

const recordRouter = (Router) => {

    Router.post('/addRecord', (req, res) => {
        //record表create新文章, then => user表更新引用，
        const { _id: editRecordId, title, content } = req.body
        const { username, userid } = req.cookies
        if (!editRecordId) {
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
                    //user表增加文章缩略
                    const newRecord = { recordId: doc._id.toString(), title }
                    User.update({ _id: userid }, { $push: { records: newRecord } }, (err, document) => {
                        res.json({ code: '000' })
                    });
                }
            })
        } else {
            //编辑文章
            Record.update({ _id: editRecordId }, {
                $set: {
                    title,
                    content
                }
            }, (err, doc) => {
                if (err) {
                    res.json({ code: '500', message: '服务器内部错误，请稍后重试' })
                }
                else {
                    // user表更新文章缩略
                    User.update({ _id: userid, 'records.recordId': editRecordId }, { $set: { 'records.$.title': title } }, {}, (err, document) => {
                        res.json({ code: '000' })
                    })
                }
            })
        }
    })

    Router.post('/deleteRecord', (req, res) => {
        const { recordId, title } = req.body
        const { userid } = req.cookies

        Record.deleteOne({ _id: recordId }, (err, doc) => {
            if (err) {
                res.json({ code: '500', message: '服务器内部错误，请稍后重试' })
            }
            else {
                //user表删除文章缩略
                User.update({ _id: userid }, { $pull: { 'records': { recordId, title } } }, {}, (err, document) => {
                    res.json({ code: '000' })
                })
            }
        })
    })

}

module.exports = {
    recordRouter
}