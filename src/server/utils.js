const md5 = require('md5')

module.exports = {
    responseFilter: {
        password: 0,
    },
    secretSault: (param) => {
        return md5(md5(param) + "QWER1234!@#$")
    }
}