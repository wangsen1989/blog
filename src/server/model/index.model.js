const mongoose = require('mongoose')

const DB_URL = "mongodb://localhost:27017/blog"
mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => {
    console.log("db connected")
})

const models = {
    user: {
        name: {
            type: String,
        },
        password: {
            type: String, required: true,
        },
        records: {
            type: Array,
        }
    },
    record: {
        username: {
            type: String, required: true,
        },
        userid: {
            type: String, required: true,
        },
        title: {
            type: String, required: true,
        },
        content: {
            type: String, required: true,
        },
        createTime: {
            type: String, default: Date.now()
        },
        comments: [{
            comment:{
                type: String, required: true,
            },
            userid:{
                type: String, required: true,
            },
            username:{
                type: String, required: true,
            },
        }],
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