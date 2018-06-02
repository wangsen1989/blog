const mongoose = require('mongoose')

const DB_URL = "mongodb://localhost:27017/blog"
mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => {
    console.log("db connected")
})

const models = {
    user: {
        name: {
            type: String, require: true,
        },
        password: {
            type: String, require: true,
        },
        records: {
            type: Array,
        }
    },
    record: {
        username: {
            type: String, require: true,
        },
        userid: {
            type: String, require: true,
        },
        title: {
            type: String, require: true,
        },
        content: {
            type: String, require: true,
        },
        createTime: {
            type: String, default: Date.now()
        },
        comments: {
            type: Array,
        },
    }
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: (name) => {
        return mongoose.model(name)
    }
}