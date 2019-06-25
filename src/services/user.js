/**
 * 用户相关服务
 */
import request from '@/utils/request'
import util from '@/utils/util'
/**
 * 调用微信登录
 */
function loginByWeixin (iv, encryptedData) {
  return new Promise(function (resolve, reject) {
    return util.login().then((res) => {
      return res.code
    }).then((code) => {
      request.post('/login', {
        code,
        iv,
        encryptedData
      }).then(res => {
        if (res.status === 1) {
          wx.setStorageSync('userInfo', res.data.user)
          wx.setStorageSync('token', res.data.token)
          resolve(res.data)
        } else {
          reject(res)
        }
      }).catch((err) => {
        reject(err)
      })
    }).catch((err) => {
      reject(err)
    })
  })
}
/**
 * 判断用户是否登录
 */
function checkLogin () {
  return new Promise(function (resolve, reject) {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      resolve(true)
    } else {
      reject(false)
    }
  })
}

const user = {
  loginByWeixin,
  checkLogin
}

export default user
