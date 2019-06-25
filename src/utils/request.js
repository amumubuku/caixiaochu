/*
 * @Description: 小程序网络http请求封装
 * @Author: fizz
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-16 09:40:27
 * @LastEditTime: 2019-06-22 17:39:48
 */
var Fly = require('flyio/dist/npm/wx') // npm引入方式
const fly = new Fly()
const host = 'https://www.icaixiaochu.com/api'
fly.interceptors.request.use((request) => {
  wx.showLoading({ title: '加载中..' })
  wx.showNavigationBarLoading() // 显示导航条加载动画
  let wxToken = wx.getStorageSync('token') || ''
  let uuid = wx.getStorageSync('uuid')
  request.headers = {
    'X-Tag': 'Fizz',
    'content-type': 'application/json'
  }
  let authParams = {
    'timestamp': new Date().getTime(),
    'sign': 'string',
    'uuid': uuid,
    'reqSource': 'wxapp',
    'version': '1.0.1',
    'token': wxToken
  }

  request.body && Object.keys(request.body).forEach((val) => {
    if (request.body[val] === '') {
      delete request.body[val]
    };
  })
  request.body = {
    ...request.body,
    ...authParams
  }

  return request
})
// 添加响应拦截器
fly.interceptors.response.use((response) => {
  wx.hideLoading()
  wx.hideNavigationBarLoading()
  if (response.data.status === 0) {
    if (response.data.info === 'fail.empty token') {
      wx.navigateTo({
        url: '../login/main'
      })
      return
    }
    setTimeout(() => {
      wx.showToast({
        title: response.data.info,
        icon: 'none',
        duration: 2000
      })
    }, 170)

    return
  }

  return response.data
},
(err) => { // 请求出错，根据返回状态码判断出错原因
  if (err) {
    wx.showToast({
      title: '网络请求错误',
      icon: 'none',
      duration: 2000
    })
  }
}
)

fly.config.baseURL = host

export default fly
