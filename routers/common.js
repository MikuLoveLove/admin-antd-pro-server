
const commonData = {
  user: {
    name: null,
    account: null,
    roleList: null,
    info: null,
    uid: null
  }
}
// 组装返回数据
const resFunc = (data, msg, code = 200, status = true) => {
  return {code, data, message: msg, status}
}
const setUser = (userData) => {
  commonData.user = {...userData}
}
module.exports = {resFunc, setUser, commonData}
