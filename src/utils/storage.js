export function setStorageSync (key, data) {
  try {
    wx.setStorageSync(key, data)
  } catch (e) { }
}
export function getStorageSync (key) {
  var data = ''
  try {
    var value = wx.getStorageSync(key)
    if (value) {
      data = value
    }
  } catch (e) {
    // Do something when catch error
  }
  return data
}
export function removeStorageSync (key) {
  try {
    wx.removeStorageSync(key)
  } catch (e) {
    // Do something when catch error
  }
}
// countDown () {
//   let newTime = new Date().getTime()
//   console.log(this.refundedData.refund.deal_time)
//   let endTimeList = [this.refundedData.refund.deal_time]
//   let countDownArr = []
//   endTimeList.forEach(o => {
//     let endTime = new Date(o).getTime()
//     let obj = null
//     if (endTime - newTime > 0) {
//       let time = (endTime - newTime) / 1000
//       let day = parseInt(time / (60 * 60 * 24))
//       let hou = parseInt((time % (60 * 60 * 24)) / 3600)
//       let min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60)
//       let sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60)
//       obj = {
//         day: this.timeFormat(day),
//         hou: this.timeFormat(hou),
//         min: this.timeFormat(min),
//         sec: this.timeFormat(sec)
//       }
//     } else {
//       // 活动已结束，全部设置为'00'
//       obj = {
//         day: '00',
//         hou: '00',
//         min: '00',
//         sec: '00'
//       }
//     }
//     countDownArr.push(obj)
//   })
//   console.log(this.countDownArr)
//   this.countDownArr = countDownArr
//   setTimeout(this.countDown, 1000)
// },
