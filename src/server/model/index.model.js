const mongoose = require('mongoose')

const models = {
    user: {
        name: {
            type: String, require: true,
        },
        password: {
            type: String, require: true,
        },
        record: {
            type: Array,
        }
    },
    record: {
        name: {
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