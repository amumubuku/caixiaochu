<template>
  <div class="shop">
    <div class="shop-wrp">
      <div class="shop-top">
        <brand />
      </div>
      <div class="card">
        <div class="card-list">
          <div
            class="card-item"
            v-for="(item,index) in cart"
            :key="index"
            @touchstart="touchStart($event)"
            @touchend="touchEnd($event,index)"
            @longpress="deleteCard(item,index)"
            @click="goodDetail(item)"
          >
            <div class="card-wrp" :data-type="item.type">
              <div class="card-centent" :style="index ===cart.length-1? 'border:none': ''">
                <div class="card-left">
                  <div class="onSelect" @click.stop="onSelect(item,index)">
                    <img v-show="item.selected==1" src="https://img.icaixiaochu.com/121.png" alt />
                    <p class="circle" v-show="!item.selected"></p>
                  </div>
                  <img :src="item.cover" mode="aspectFill" class="card-cover" alt />
                </div>
                <div class="card-right">
                  <div class="name-wrp">
                    <p>{{item.name}}</p>
                    <p class="unit">{{item.title}}</p>
                  </div>
                  <div class="price-wrp">
                    <div class="menu-left">
                      <div class="price">
                        <span class="money">¥</span>
                        <span>{{item.sellerPrice}}</span>
                      </div>
                      <div class="dash-price-info">
                        <div
                          :class="item.vipPrice > 1 ? 'dash-price' : 'dash-price small'"
                        >¥{{item.vipPrice > 1 ? item.vipPrice : item.price}}</div>
                        <div class="vip-price" v-if="item.vipPrice > 1">
                          <img src="http://p2.icaixiaochu.com/vip-icon.png" alt />
                        </div>
                      </div>
                    </div>
                    <div class="numAction">
                      <div class="active subtract extend" @click.stop="subtract(item,index)">
                        <img src="http://p2.icaixiaochu.com/subtract.png" alt />
                      </div>
                      <div class="value">{{item.count}}</div>
                      <div class="active add extend" @click.stop="add(item,index)">
                        <img src="http://p2.icaixiaochu.com/card-add.png" alt />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="delete-card" @click.stop="deleteCard(item,index)">
                <img src="http://img.icaixiaochu.com/Ki0DpGxbwFdZjPTh.png" alt />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="invalid-wrp" v-if="invaldGoods.length >=1">
        <div class="invaild-content">
           <div class="hand-box" @click="emptyInvalid">
          <p>{{invaldGoods.length}}件失效商品</p>
          <img src="http://img.icaixiaochu.com/Ki0DpGxbwFdZjPTh.png" alt />
        </div>
        <div class="card-item" v-for="(item,index) in invaldGoods" :key="index">
          <div class="card-wrp" :data-type="item.type">
            <div class="card-centent" :style="index ===invaldGoods.length-1? 'border:none': ''">
              <div class="card-left">
                <div class="good-state">
                  <p class="invalid-icon">失效</p>
                </div>
                <img :src="item.cover" class="card-cover" alt />
              </div>
              <div class="card-right">
                <div class="name-wrp">
                  <p style="color:rgba(64,64,64,.6)">{{item.name}}</p>
                  <p class="unit">{{item.title}}</p>
                </div>
                <div class="price-wrp">暂不销售</div>
              </div>
            </div>
          </div>
        </div>
        </div>
       
      </div>
      <div class="shop-info" v-if="!cart.length >= 1 &&!invaldGoods.length >= 1">
        <div class="card-empty">
          <img src="https://img.icaixiaochu.com/6RVWIULNQDp2xAau.png" alt />
        </div>
        <div class="shop-prompt">您的购物车还空着呐~快去逛逛吧</div>
        <button class="btn" @click="toHome()">去逛逛</button>
      </div>
      <div class="recomend-wrp">
        <recommend :goods="goodsList" />
      </div>
    </div>
    <div class="footer-war">
      <div class="cart-flex-top">
        <img src="http://p2.icaixiaochu.com/logo.png" alt="">
        <p>满{{delivery.price_shipping_out}}减免配送费，{{delivery.price_send}}元起送</p>
      </div>
      <div class="cart-flex-but">
        <div class="select-all" @click="selectAll">
          <div class="icon">
            <p v-show="!cartInfos.selectedAll" class="circle"></p>
            <img v-show="cartInfos.selectedAll" src="https://img.icaixiaochu.com/121.png" alt />
          </div>
          <p>全选</p>
        </div>
        <div class="card-info">
          <div class="card-info-left">
            <p class="price-num">合计：¥{{cartInfos.price}}</p>
            <p class="coupon">优惠：¥{{cartInfos.couponPrice }}</p>
          </div>
          <div class="card-info-rifht" @click="subOrder">
            <form>
              <div class="style1">立即结算</div>
               <!-- v-if="delivery.price_send <=cartInfos.price" -->
              <!-- <div class="style2" v-else>还差{{deliveryPrice}}元</div> -->
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import brand from '@/components/brand'
import recommend from '@/components/recommend'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    brand,
    recommend
  },
  data () {
    return {
      goodsList: [],
      delivery: '',
      noticeMsg: ''
    }
  },
  computed: {
    ...mapGetters(['cart', 'cartInfos', 'user', 'invaldGoods']),
    deliveryPrice () {
      return (this.delivery.price_send - this.cartInfos.price).toFixed(2)
    }
  },
  onPullDownRefresh () {
    this.InfoCart()
  },
  mounted () {
    this.DeliveryInfo()
    this.$http.post('/getNotice').then(res => {
      this.notice = res.data
    })
  },
  onShow () {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      this.InfoCart()
    }
    this.getrecommend()
  },
  methods: {
    DeliveryInfo () {
      this.$http.post('/getPriceSend').then(res => {
        this.delivery = res.data
      })
    },
    deleteCard (item, index) {
      var that = this
      wx.showModal({
        title: '提示',
        content: '删除选中的商品?',
        success (res) {
          if (res.confirm) {
            that.delete_db({ cartid: item.id, index })
          } else if (res.cancel) {
          }
        }
      })
    },
    touchStart (e) {
      this.startX = e.mp.changedTouches[0].clientX
    },
    touchEnd (e, index) {
      this.endX = e.mp.changedTouches[0].clientX
      if (this.startX - this.endX > 10) {
        for (let i = 0; i < this.cart.length; i++) {
          this.toggle_type({ index: i, type: 0 })
        }
        this.toggle_type({ index, type: 1 })
      } else if (this.startX - this.endX < -10) {
        for (let i = 0; i < this.cart.length; i++) {
          this.toggle_type({ index: i, type: 0 })
        }
      }
    },
    recover (index) {
      this.toggle_type({ index, type: 0 })
    },
    getrecommend () {
      this.$http.get('/fetchHotGoods').then(res => {
        this.goodsList = res.data
      })
    },
    selectAll () {
      let state = this.cartInfos.selectedAll ? 0 : 1
      let cartIds = []
      this.cart.forEach(element => {
        cartIds.push(element.id)
      })
      this.$http
        .post('/selectGoods', {
          cart_id: cartIds.join(','),
          state
        })
        .then(res => {
          this.InfoCart()
        })
    },
    emptyInvalid () {
      let _this = this
      wx.showModal({
        title: '',
        content: '是否清除所有失效商品',
        success (res) {
          if (res.confirm) {
            _this.invaldGoods.forEach(element => {
              _this.$http.post('/deleteCart', { cart_id: element.id })
            })
            _this.InfoCart()
          } else if (res.cancel) {
            console.log('取消清除')
          }
        }
      })
    },
    goodDetail (item) {
      wx.navigateTo({
        url: `../goods/main?id=${item.good_id}`
      })
    },
    add (item, index) {
      this.add_db({ cartid: item.id, index })
    },
    subtract (item, index) {
      if (item.count <= 1) {
        this.deleteCard(item, index)
        return
      }
      this.reduce_db({ cartid: item.id, index })
    },
    onSelect (data, index) {
      this.check_db({ data, index })
    },
    toHome () {
      wx.switchTab({
        url: `../index/main`
      })
    },
    subOrder () {
      if (this.cartInfos.num >= 1) {
        if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
          let goods = []
          this.cart.forEach(element => {
            if (element.selected === 1) {
              goods.push({
                goods_id: element.good_id,
                goods_title: element.name,
                cover: element.cover,
                label: element.label,
                number: element.count,
                price: element.price,
                real_price:
                  this.user.is_vip && element.vipPrice > 1
                    ? element.vipPrice
                    : element.sellerPrice,
                sku_id: element.sku_id
              })
            }
          })
          this.setGood(goods)
          wx.navigateTo({
            url: `../order/main`
          })
        }
      } else {
        wx.showToast({
          title: '购物车还空着呢',
          icon: 'none',
          duration: 2000
        })
      }
    },
    ...mapActions([
      'add_db',
      'reduce_db',
      'check_db',
      'select_all',
      'toggle_type',
      'delete_db',
      'InfoCart',
      'setGood'
    ])
  }
}
</script>

<style lang="less" scoped>
@import "./style.less";
</style>

