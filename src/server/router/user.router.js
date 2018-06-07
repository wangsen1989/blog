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
                res.json({ code: '002', message: '执行失败，请检查填写是否合法' })
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
                        if (error) {
                            res.json({ code: '002', message: '执行失败，请检查填写是否合法' })
                        } else {
                            const _id = document._id.toString()
                            // const { password, ...otherDoc } = document._doc
                            const otherDoc = {}
                            Object.keys(document._doc).forEach(k => {
                                if (k !== 'password') {
                                    otherDoc[k] = document._doc[k]
                                }
                            })
                            res.cookie('userid', _id)
                            res.cookie('accessToken', utils.secretSault(_id))
                            res.cookie('username', document.name)
                            res.json({ code: '000', data: otherDoc })
                        }
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
        req.require
        var form = new multiparty.Form();
        form.encoding = 'utf-8';
        form.uploadDir = path.join(__dirname, '../../../../imageserver/static')
        form.parse(req, function (err, fields, files) {
            if (err) {
                res.json({ code: '500', message: '服务器内部错误，请稍后重试' })
            } else {
                const { path: _path } = files.avatar[0]
                const imageRoot = path.join(__dirname, '../../../../')
                const imagePath = _path.split(imageRoot)[1]
                User.update({ _id: userid }, { $set: { 'avatar': imagePath, } }, { upsert: true, strict: false }, (err, doc) => {
                    if (err) {
                        res.json({ code: '500', message: '服务器内部错误，请稍后重试' })
                    }
                    else {
                        res.json({ code: '000', data: { 'avatar': imagePath, } })
                    }
                })
            }
        })
    })

}

module.exports = {
    userRouter
}