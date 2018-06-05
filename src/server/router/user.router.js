const mongoose = require('mongoose')
const fs = require('fs')
const multiparty = require('multiparty')
const multer = require('multer')
const model = require('../model/index.model')
const User = model.getModel('user')
const utils = require('../utils')
const path = require('path')

const userRouter = (Router) => {


    Router.post('/login', (req, res) => {
        const { name, password } = req.body;
        const md5Pwd = utils.secretSault(password);
        User.findOne({ name, password: md5Pwd }, utils.responseFilter, (err, doc) => {
            if (err) {
                res.json({ code: '500', message: '服务器内部错误，请稍后重试' })
            }
            else {
                if (doc) {
                    const _id = doc._id.toString()
                    res.cookie('userid', _id)
                    res.cookie('accessToken', utils.secretSault(_id))
                    res.cookie('username', doc.name)
                    res.json({ code: '000', data: doc })
                } else {
                    User.create({ name, password: md5Pwd }, { password: 0 }, (error, document) => {
                        const _id = document._id.toString()
                        const { password, ...otherDoc } = document._doc
                        res.cookie('userid', _id)
                        res.cookie('accessToken', utils.secretSault(_id))
                        res.cookie('username', document.name)
                        res.json({ code: '000', data: otherDoc })
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


    Router.post('/upLoadFile', (req, res) => {
        let { userid = '' } = req.cookies;
        var form = new multiparty.Form();
        form.encoding = 'utf-8';
        form.uploadDir = path.join(__dirname, '../upLoadFile')
        form.parse(req, function (err, fields, files) {
            if (err) {
                res.json({ code: '500', message: '服务器内部错误，请稍后重试' })
            } else {
                const { path } = files.avatar[0]
                User.update({ _id: userid }, { $set: { 'avatar': path, } }, { upsert: true, strict: false }, (err, doc) => {
                    if (err) {
                        res.json({ code: '500', message: '服务器内部错误，请稍后重试' })
                    }
                    else {
                        res.json({ code: '000', data: doc })
                    }
                })
            }
        })
    })

}

module.exports = {
    userRouter
}