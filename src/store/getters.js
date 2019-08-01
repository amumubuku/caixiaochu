import { setTabBarBadge, removeTabBarBadge } from '@/utils'
const getters = {
  cityName: state => state.user.cityName,
  data: state => state.user.data,
  city: state => state.user.city,
  cart: state => state.cart.cartList,
  user: state => state.user.user,
  address: state => state.user.address,
  goods: state => state.user.goods,
  hitory: state => state.user.searchHitory,
  defaultAddress: state => state.user.DefaultAddress,
  conponData: state => state.user.conponData,
  invaldGoods: state => state.cart.invaldGoods,
  cartInfos: state => {
    var num = 0
    var price = 0
    var total = 0
    var shopInfo = {}
    var selectedAll = true
    state.cart.cartList.forEach(ele => {
      if (ele.selected) {
        num += ele.count
        price += state.user.user.is_vip && ele.vipPrice > 1 ? ele.count * ele.vipPrice : ele.count * ele.sellerPrice
        total += ele.count * ele.price
      } else {
        selectedAll = false
      }
    })
    shopInfo = {
      num,
      price: price.toFixed(2),
      total: total.toFixed(2),
      couponPrice: (total - price).toFixed(2),
      selectedAll
    }
    if (num >= 1) {
      setTabBarBadge(num.toString())
    } else {
      removeTabBarBadge()
    }
    wx.setStorageSync('cartInfos', shopInfo)
    return shopInfo
  }
}
export default getters
