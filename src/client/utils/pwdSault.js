import md5 from "md5"

const pwdSault = (pwd) => {
    return md5(md5(pwd + "SERVER ADD SAULT TOO!"))
}

export default pwdSault;