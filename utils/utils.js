
const resFunc = (data, msg, code = 200, status = true) => {
    return {code, data, message: msg, status}
  }

const commonCallBack = (options) => {
    return (err) => {
        const {success, error, res} = options
        let message = resFunc(null, success, null, !err)
        if (err) {
            message = resFunc(err, error, null, !err)
        } 
        debugger
        console.log('666', message, err)
        res.send(message)
    }
}
module.exports = {commonCallBack, resFunc}