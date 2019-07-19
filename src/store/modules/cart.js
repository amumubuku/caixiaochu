import request from '@/utils/request'
const state = {
  // 购物车所有的商品列表
  cartList: [],
  cartInfos: {
    selectedAll: true
  },
  invaldGoods: []
}
const mutations = {
  UPDATE_CART: (state, carts) => {
    state.cartList = carts
  },
  UPDATE_INVALID: (state, data) => {
    state.invaldGoods = data
  },
  TOGGLE_TYPE: (state, {
    index,
    type
  }) => {
    state.cartList[index].type = type
  },
  CREATE_DB: (state, shop) => {
    if (state.cartList.length >= 1) {
      var flg = false
      for (let index = 0; index < state.cartList.length; index++) {
        if (state.cartList[index].good_id == shop.good_id) {
          state.cartList[index].count++
          flg = true
          break
        }
      }
      if (!flg) {
        state.cartList.push(shop)
      }
      // state.cartList.forEach(ele => {
      //   if (ele.selected) {
      //     state.cartInfos.num += ele.count
      //     state.cartInfos.price += ele.count * ele.price
      //     state.cartInfos.couponPrice += ele.price - ele.sellerPrice
      //   }
      // })
    } else {
      state.cartList.push(shop)
    }
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 2000
    })
  },
  // 给购物车的商品++
  ADD_DB: (state, index) => {
    console.log(index, state.cartList[index])

    state.cartList[index].count++
    // state.cartList.forEach(ele => {
    //   if (ele.selected) {
    //     state.cartInfos.num += ele.count
    //     state.cartInfos.price += ele.count * ele.price
    //     state.cartInfos.couponPrice += ele.price - ele.sellerPrice
    //   }
    // })
  },
  // 商品购物车减少--
  REDUCE_DB: (state, index) => {
    if (state.cartList[index].count <= 1) {
      return
    }
    state.cartList[index].count--
    // state.cartList.forEach(ele => {
    //   if (ele.selected) {
    //     state.cartInfos.num += ele.count
    //     state.cartInfos.price += ele.count * ele.price
    //     state.cartInfos.couponPrice += ele.price - ele.sellerPrice
    //   }
    // })
  },
  UPDATE_LOCAL: (state) => {
    wx.setStorageSync('carts', state.cartList)
  },
  EMPTY_CARTS: (state) => {
    state.cartList = []
    state.invaldGoods = []
  },
  // 删除购物车的商品
  DELETE_DB: (state, index) => {
    state.cartList.splice(index, 1)
  },
  // 更新购物车数据
  UPDATE_CUR_SHOP_STATUS: (state, cartList) => {
    state.cartList = cartList
  },
  // 检测购物车内是否存在某菜品
  CHECK_DB: (state, shop) => {
    if (Array.isArray(shop) && shop.good_id) {
      return state.cartList.includes(shop)
    }
    return false
  },
  // 清空购物车
  CLEAR_LOCAL: (state, city) => {
    state.city = city
  },
  // 切换购物车选中状态
  SELECTED: (state, index) => {
    state.cartList[index].selected = state.cartList[index].selected === 0 ? 1 : 0
    // for (let index = 0; index < state.cartList.length; index++) {
    //   if (state.cartList[index].selected) {
    //     state.cartInfos.selectedAll = true
    //   } else {
    //     state.cartInfos.selectedAll = false
    //   }
    // }
  },
  SELECT_ALL: (state) => {
    let selectAllStatus = !state.cartInfos.selectedAll
    for (let i = 0; i < state.cartList.length; i++) {
      state.cartList[i].selected = selectAllStatus
    }
    state.cartInfos.selectedAll = selectAllStatus
  }
}

const actions = {
  create_db ({
    commit
  }, shop) {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      request.post('addCart', {
        goods_id: shop.goods_id,
        sku_id: shop.sku.id,
        number: 1
      }).then(res => {
        if (res.status) {
          let cart = {
            stock: shop.stock,
            cover: shop.cover,
            good_id: shop.goods_id,
            name: shop.title,
            selected: 1,
            count: 1,
            sellerPrice: shop.sku.market_price,
            price: shop.sku.normal_price,
            vipPrice: shop.sku.vip_price,
            sku_id: shop.sku.id,
            id: shop.id,
            type: 0,
            label: shop.label
          }
          commit('CREATE_DB', cart)
          commit('UPDATE_LOCAL')
        }
      })
    } else {
      wx.navigateTo({
        url: `../login/main`
      })
    }
  },
  add_db ({
    commit
  }, {
    cartid,
    index
  }) {
    request.post('/plus', {
      cart_id: cartid
    }).then(res => {
      if (res.status) {
        commit('ADD_DB', index)
        commit('UPDATE_LOCAL')
      }
    })
  },
  reduce_db ({
    commit
  }, {
    cartid,
    index
  }) {
    request.post('/reduce', {
      cart_id: cartid
    }).then(res => {
      if (res.status) {
        commit('REDUCE_DB', index)
        commit('UPDATE_LOCAL')
      }
    })
  },
  delete_db ({
    commit
  }, {
    cartid,
    index
  }) {
    request.post('deleteCart', {
      cart_id: cartid
    }).then(res => {
      if (res.status) {
        commit('DELETE_DB', index)
        commit('UPDATE_LOCAL')
      }
    })
  },

  update_shop ({
    commit
  }, shop) {
    commit('UPDATE_CUR_SHOP_STATUS', shop)
  },
  InfoCart ({
    commit
  }) {
    // commit('EMPTY_CARTS')
    request.post('/fetchCart').then(res => {
      wx.stopPullDownRefresh()
      var data1 = []
      var data2 = []
      res.data.forEach(element => {
        let data = {
          cover: element.good.cover,
          good_id: element.goods_id,
          name: element.good.title,
          selected: element.is_select,
          count: element.number,
          sellerPrice: element.good.market_price,
          price: element.good.normal_price,
          vipPrice: element.good.vip_price,
          sku_id: element.sku_id,
          id: element.id,
          stock: element.good.stock,
          type: 0,
          status: element.goods_status,
          label: element.good.label
        }
        if (element.goods_status) {
          data1.push(data)
        } else {
          data2.push(data)
        }
      })
      commit('UPDATE_CART', data1)
      commit('UPDATE_INVALID', data2)
    })
  },
  check_db ({
    commit
  }, {
    data,
    index
  }) {
    let state = data.selected === 0 ? 1 : 0
    request.post('/selectGoods', {
      cart_id: data.id,
      state
    }).then(res => {
      commit('SELECTED', index)
      commit('UPDATE_LOCAL')
    })
  },
  select_all ({
    commit
  }, state) {
    commit('SELECT_ALL', state ? 0 : 1)
    commit('UPDATE_LOCAL')
  },
  toggle_type ({
    commit
  }, {
    index,
    type
  }) {
    commit('TOGGLE_TYPE', {
      index,
      type
    })
    commit('UPDATE_LOCAL')
  }
}

export default {
  state,
  mutations,
  actions
}
