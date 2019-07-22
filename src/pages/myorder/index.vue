<template>
  <div class="order">
    <div class="order-wrp">
      <div class="order-nav">
        <block v-for="(item,index) in tabs" :key="index">
          <div
            :id="index"
            :class="{'navbar_item_on':activeIndex == index}"
            class="nav-item"
            @click="tabClick"
          >
            <p>{{item.name}}</p>
          </div>
        </block>
        <div class="navbar_slider" :class="navbarSliderClass"></div>
      </div>
      <swiper
        class="content"
        :duration="50"
        :style="'height:'+contentHeight"
        @change="swiperChange"
        :current="activeIndex"
        @animationfinish="onAnimationfinish"
      >
        <swiper-item class="order-list">
          <scroll-view
            class="order_scroll"
            scroll-y="true"
            lower-threshold="50"
            @scrolltolower="loadingMore"
          >
            <div class="order-content" v-for="(item,index) in orders.all" :key="index">
              <div class="order-contetn-top">
                <div class="flex-left">
                  <p class="time">{{item.time_create}}</p>
                </div>
                <div class="flex-right">
                  <p
                    class="order-state"
                  >{{item.status == 0? '待支付':item.status == 1? '待配送':item.status == 2? '待收货': item.status == 3?'已完成':item.status == 4?'待取货':'已取消'}}</p>
                </div>
              </div>
              <div class="good-list">
                <collapse :selected="true" :goods="item.goods"></collapse>
              </div>
              <div class="order-but">
                <div class="good-content-top">
                  <p>共{{item.goods.length}}件商品</p>
                  <p>实付：¥{{item.money_pay}}</p>
                </div>
                <div
                  class="good-content-btn"
                  v-if="item.status === 0"
                  @click="orderDetail(item)"
                >去付款</div>
                <div class="order-detail" v-if="item.status != 0" @click="orderDetail(item)">查看详情</div>
              </div>
            </div>
            <div class="null-oder-wrp" v-if="!orders.all.length>=1">
              <img src="https://img.icaixiaochu.com/order-bg.png" alt />
              <p>你还没有订单~快去逛逛吧~！</p>
              <button class="btn" @click="toHome()">去逛逛</button>
            </div>
          </scroll-view>
        </swiper-item>
        <swiper-item class="order-list">
          <scroll-view
            class="order_scroll"
            scroll-y="true"
            lower-threshold="50"
            @scrolltolower="loadingMore"
          >
            <div class="order-content" v-for="(item,index) in orders.unPay" :key="index">
              <div class="order-contetn-top">
                <div class="flex-left">
                  <p class="time">{{item.time_create}}</p>
                </div>
                <div class="flex-right">
                  <p
                    class="order-state"
                  >{{item.status == 0? '待支付':item.status == 1? '待配送':item.status == 2? '待收货': item.status == 3?'已完成':item.status == 4?'待取货':'已取消'}}</p>
                </div>
              </div>
              <div class="good-list">
                <collapse :selected="true" :goods="item.goods"></collapse>
              </div>
              <div class="order-but">
                <div class="good-content-top">
                  <p>共{{item.goods.length}}件商品</p>
                  <p>实付：¥{{item.money_pay}}</p>
                </div>
                <div class="order-fun-handle">
                  <div class="order-detail"  @click="orderDetail(item)">查看详情</div>
                 <div class="good-content-btn" @click="payment(item)">去付款</div>
                </div>
              </div>
            </div>
          </scroll-view>
          <div class="null-oder-wrp" v-if="!orders.unPay.length>=1">
            <img src="https://img.icaixiaochu.com/order-bg.png" alt />
            <p>你还没有订单~快去逛逛吧~!</p>
            <button class="btn" @click="toHome()">去逛逛</button>
          </div>
        </swiper-item>
        <swiper-item class="order-list">
          <scroll-view
            class="order_scroll"
            scroll-y="true"
            lower-threshold="50"
            @scrolltolower="loadingMore"
          >
            <div class="order-content" v-for="(item,index) in orders.unShipping" :key="index">
              <div class="order-contetn-top">
                <div class="flex-left">
                  <p class="time">{{item.time_create}}</p>
                </div>
                <div class="flex-right">
                  <p
                    class="order-state"
                  >{{item.status == 0? '待支付':item.status == 1? '待配送':item.status == 2? '待收货': item.status == 3?'已完成':item.status == 4?'待取货':'已取消'}}</p>
                </div>
              </div>
              <div class="good-list">
                <collapse :selected="true" :goods="item.goods"></collapse>
              </div>
              <div class="order-but">
                <div class="good-content-top">
                  <p>共{{item.goods.length}}件商品</p>
                  <p>实付：¥{{item.money_pay}}</p>
                </div>
                <div class="order-fun-handle">
                  <div class="order-detail" @click="orderDetail(item)">查看详情</div>
                   <div class="order-detail" @click="orderDetail(item)">提醒发货</div>
                </div>
              
              </div>
            </div>
          </scroll-view>
          <div class="null-oder-wrp" v-if="!orders.unShipping.length>=1">
            <img src="https://img.icaixiaochu.com/order-bg.png" alt />
            <p>你还没有订单~快去逛逛吧~!</p>
            <button class="btn" @click="toHome()">去逛逛</button>
          </div>
        </swiper-item>
        <swiper-item class="order-list">
          <scroll-view
            class="order_scroll"
            scroll-y="true"
            lower-threshold="50"
            @scrolltolower="loadingMore"
          >
            <div class="order-content" v-for="(item,index) in orders.shipping" :key="index">
              <div class="order-contetn-top">
                <div class="flex-left">
                  <p class="time">{{item.time_create}}</p>
                </div>
                <div class="flex-right">
                  <p
                    class="order-state"
                  >{{item.status == 0? '待支付':item.status == 1? '待配送':item.status == 2? '待收货': item.status == 3?'已完成':item.status == 4?'待取货':'已取消'}}</p>
                </div>
              </div>
              <div class="good-list">
                <collapse :selected="true" :goods="item.goods"></collapse>
              </div>
              <div class="order-but">
                <div class="good-content-top">
                  <p>共{{item.goods.length}}件商品</p>
                  <p>实付：¥{{item.money_pay}}</p>
                </div>
                <div class="order-fun-handle">
                  <div class="order-detail" @click="orderDetail(item)">查看详情</div>
                  <div class="good-content-btn" @click="shipping(item)">确认收货</div>
                </div>
              </div>
            </div>
          </scroll-view>
          <div class="null-oder-wrp" v-if="!orders.shipping.length>=1">
            <img src="https://img.icaixiaochu.com/order-bg.png" alt />

            <p>你还没有订单~快去逛逛吧~!</p>
            <button class="btn" @click="toHome()">去逛逛</button>
          </div>
        </swiper-item>
        <swiper-item class="order-list">
          <scroll-view
            class="order_scroll"
            scroll-y="true"
            lower-threshold="50"
            @scrolltolower="loadingMore"
          >
            <div class="order-content" v-for="(item,index) in orders.finish" :key="index">
              <div class="order-contetn-top">
                <div class="flex-left">
                  <p class="time">{{item.time_create}}</p>
                </div>
                <div class="flex-right">
                  <p
                    class="order-state"
                  >{{item.status == 0? '待支付':item.status == 1? '待配送':item.status == 2? '待收货': item.status == 3?'已完成':item.status == 4?'待取货':'已取消'}}</p>
                </div>
              </div>
              <div class="good-list">
                <collapse :selected="true" :goods="item.goods"></collapse>
              </div>
              <div class="order-but">
                <div class="good-content-top">
                  <p>共{{item.goods.length}}件商品</p>
                  <p>实付：¥{{item.money_pay}}</p>
                </div>
                <div
                  class="good-content-btn"
                  v-if="item.status == 3"
                  @click="orderDetail(item)"
                >查看详情</div>
              </div>
            </div>
          </scroll-view>
          <div class="null-oder-wrp" v-if="!orders.finish.length>=1">
            <img src="https://img.icaixiaochu.com/order-bg.png" alt />
            <p>你还没有订单~快去逛逛吧~!</p>
            <button class="btn" @click="toHome()">去逛逛</button>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
import Collapse from '@/components/collapse'
export default {
  components: { Collapse },
  data () {
    return {
      orderState: {
        0: 'all',
        1: 'unPay',
        2: 'unShipping',
        3: 'shipping',
        4: 'finish'
      },

      orders: {
        all: [],
        unPay: [],
        unShipping: [],
        shipping: [],
        finish: []
      },
      page: 1,
      status: 'all',
      tabs: [
        {
          name: '全部订单',
          type: '0',
          checked: true
        },
        {
          name: '待付款',
          type: '1',
          checked: true
        },
        {
          name: '待配送',
          type: '2',
          checked: true
        },
        {
          name: '待收货',
          type: '3',
          checked: true
        },
        {
          name: '已完成',
          type: '4',
          checked: true
        }
      ],

      loading: false,
      activeIndex: 0,
      winWidth: 0,
      winHeight: 0,
      navbarSliderClass: ''
    }
  },
  computed: {
    contentHeight () {
      return this.winHeight + 'px'
    }
  },
  onUnload () {
    var pages = getCurrentPages()
    var currentPage = pages[pages.length - 2]
    var url = currentPage.route
    if (url === 'pages/order/main') {
      wx.navigateBack({
        delta: 1
      })
    }
  },
  watch: {
    activeIndex: {
      handler (newVal, oldVal) {
        this.navbarSliderClass = `navbar_slider_${newVal}`
      },
      immediate: true
    }
  },
  methods: {
    loadingMore () {
      if (this.loading) {
        this.page++
        this.Refresh()
      }
    },
    shipping (item) {
      let _this = this
      wx.showModal({
        title: '是否已收到商品',
        content: '请确认收到商品后再确定收货?',
        success (res) {
          if (res.confirm) {
            _this.$http
              .post('/confirmGoods', { order_id: item.order_id })
              .then(res => {
                _this.page = 1
                _this.getOrders()
              })
          } else if (res.cancel) {
          }
        }
      })
    },
    toHome () {
      wx.switchTab({
        url: `../index/main`
      })
    },
    Refresh () {
      this.$http
        .post('/myOrders', {
          status: this.status,
          page: this.page
        })
        .then(res => {
          if (res.data.length < 1 && this.page > 1) {
            this.loading = false
            wx.showToast({
              title: '没有更多订单了',
              icon: 'none',
              duration: 2000
            })
            return
          }

          this.orders[this.status] = this.orders[this.status].concat(res.data)
        })
    },
    getOrders () {
      this.$http
        .post('/myOrders', {
          status: this.status,
          page: this.page
        })
        .then(res => {
          this.orders[this.status] = res.data
          wx.stopPullDownRefresh()
        })
    },
    toggle (index) {
      this.currentId = index
    },
    tabClick (e) {
      this.activeIndex = e.currentTarget.id
    },
    swiperChange (e) {
      wx.hideToast()
      this.page = 1
      this.loading = true
      this.activeIndex = e.mp.detail.current
      this.status = this.orderState[this.activeIndex]
      this.orders[this.status] = []
      this.getOrders()
    },
    payment (item) {
      wx.navigateTo({
        url: `../orderdetail/main?id=${item.order_id}`
      })
    },
    orderDetail (item) {
      wx.navigateTo({
        url: `../orderdetail/main?id=${item.order_id}`
      })
    }
  },
  onShow () {
    this.getOrders()
  },
  mounted () {
    this.activeIndex = parseInt(this.$root.$mp.query.activeIndex || 0)
    this.status = this.orderState[this.activeIndex]
    this.getOrders()
    var res = wx.getSystemInfoSync()
    this.winWidth = res.windowWidth
    this.winHeight = res.windowHeight
  },
  onPullDownRefresh () {
    this.getOrders()
  }
}
</script>
<style lang="less" scoped>
@import "./style.less";
</style>
