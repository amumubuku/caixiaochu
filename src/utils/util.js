/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-16 09:40:27
 * @LastEditTime: 2019-07-03 09:26:41
 * @LastEditors: Please set LastEditors
 */

// import api from '@/utils/api'
import {setStorageSync, getStorageSync} from './storage'
function formatTime (date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber (n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
export function dobounce (fuc, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fuc.apply(this, args)
    }, delay)
  }
}
/**
 * 封封微信的的request
 */
function request (url, data = {}, method = 'GET') {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log('请求成功，url:', url);
        // console.log('请求参数，data:', data);
        if (res.statusCode === 200) {
          if (res.data.errno === 401) {
            // 需要登录后才可以操作
            let code = null
            return login().then((res) => {
              code = res.code
              return getUserInfo()
            }).then((userInfo) => {
              // 登录远程服务器
              request(api.AuthLoginByWeixin, {
                code: code
              }, 'POST').then(res => {
                if (res.errno === 0) {
                  // 存储用户信息
                  setStorageSync('userInfo', res.data.userInfo)
                  setStorageSync('token', res.data.token)
                  resolve(res)
                } else {
                  reject(res)
                }
              }).catch((err) => {
                reject(err)
              })
            }).catch((err) => {
              reject(err)
            })
          } else {
            resolve(res.data)
          }
        } else {
          reject(res.errMsg)
        }
      },
      fail: function (err) {
        reject(err)
        // console.log('请求失败，url', url);
        // console.log('请求参数，data:', data);
      }
    })
  })
}

/**
 * 检查微信会话是否过期
 */
function checkSession () {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: function () {
        resolve(true)
      },
      fail: function () {
        reject(false)
      }
    })
  })
}
/**
 * 调用微信登录
 */
function login () {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) {
          resolve(res)
        } else {
          reject(res)
        }
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}
/**
 * 调用微信获取用户信息接口，需要button授权
 */
function getUserInfo () {
  return new Promise(function (resolve, reject) {
    // 查看button是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            withCredentials: true,
            success: function (res) {
              // console.log('获取用户信息成功', res);
              resolve(res)
            },
            fail: function (err) {
              // console.log('获取用户信息失败', err);
              reject(err)
            }
          })
        } else { // 没有授权
          // console.log('但获取用户信息失败，未同意button授权');
        }
      }
    })
  })
}

/**
 * @description:  判断用户是否登录，没有登录跳转登录授权页面
 * @param {url}
 * @return: null
 */
function checkLogin (url) {
  if (getStorageSync('userInfo') && getStorageSync('token')) {
    wx.navigateTo({
      url
    })
    return false
  } else {
    wx.navigateTo({
      url: '../login/main'
    })
  }
}

function showErrorToast (msg) {
  wx.showToast({
    title: msg,
    image: '/static/images/icon_error.png'
  })
}

const util = {
  formatTime,
  request,
  checkLogin,
  showErrorToast,
  checkSession,
  login,
  getUserInfo
}

export default util
