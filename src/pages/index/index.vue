<template>
  <div class="app">
    <div class="header">
      <div class="header-wrp">
        <div class="location-box" @click="toAddresPage">
          <img src="http://p2.icaixiaochu.com/location.png" alt class="location-icon" />
          <p>{{cityName}}</p>
          <img src="http://p2.icaixiaochu.com/down.png" alt />
        </div>
        <form class="form" @click="toSearchPage">
          <div class="btn">
            <img src="http://p2.icaixiaochu.com/search.png" alt />
            <span>请输入关键字</span>
          </div>
        </form>
      </div>
    </div>
    <div class="app-wrp">
      <brand />
      <banner :data="banner" />
      <div class="catogory">
        <div class="catogory-wrp">
          <div
            class="catogory-item"
            v-for="(item,index) in navlist"
            :key="index"
            @click="jumpCatogory(item)"
          >
            <img :src="item.icon" alt />
            <p>{{item.title}}</p>
          </div>
        </div>
      </div>
      <div class="activity" v-if="Activity.length>=1">
        <div class="activity-left" @click="toActivity">
          <div class="head">
            <h4>限时抢</h4>
            <div class="time-row">
              <div class="time-col">{{countDownTime.hou}}</div>:
              <div class="time-col">{{countDownTime.min}}</div>:
              <div class="time-col">{{countDownTime.sec}}</div>
            </div>
          </div>
          <p style="padding-left:13px">{{Activity[0].hour+Activity[0].description}}</p>
          <img :src="Activity[0].image" mode="aspectFill" alt />
        </div>
        <div class="activity-right">
          <div class="top" @click="toDiscount">
            <div class="info">
              <p>{{Activity[1].title}}</p>
              <span>{{Activity[1].description}}</span>
              <text>{{Activity[1].btn_str}}</text>
            </div>
            <div class="icon">
              <img :src="Activity[1].image" mode="aspectFill" alt />
            </div>
          </div>
          <div class="but" @click="toCoupon">
            <div class="info">
              <p>{{Activity[2].title}}</p>
              <span>{{Activity[2].description}}</span>
              <text>{{Activity[2].btn_str}}</text>
            </div>
            <div class="icon">
              <img :src="Activity[2].image" alt />
            </div>
          </div>
        </div>
      </div>
      <div class="exclusive">
        <div class="exclusive-wrp">
          <div class="ex-title">
            <div class="text">
              <div class="head">
                <div class="new-title">新品推荐</div>
                <p class="small">不容错过</p>
              </div>
            </div>
            <div class="more" @click="tonewarea">
              <p class="more-small">查看更多</p>
              <img src="http://p2.icaixiaochu.com/more.png" alt class="more-icon" />
            </div>
          </div>
          <div class="shop">
            <scroll-view width="100%" class="scroll" scroll-x="true">
              <div class="shop-list" v-if="newSkulist.length>=1">
                <div
                  class="list"
                  v-for="(item,index) in newSkulist"
                  :key="index"
                  @click.stop="navtodetail(item)"
                  :class="{'text-danger': index === newSkulist.length-1}"
                >
                  <div class="item-top">
                    <img :src="item.cover" mode="aspectFill" alt />
                  </div>
                  <div class="footer-info">
                    <div class="footer-title">
                      <h5 class="footer-text">{{item.title}}</h5>
                    </div>
                    <div class="footer-menu">
                      <div class="menu-left">
                        <div class="price">
                          <span class="icon">¥</span>
                          <span>{{item.sku.market_price}}</span>
                        </div>
                        <div class="dash-price-info">
                          <div class="dash-price small">¥{{item.sku.normal_price}}</div>
                        </div>
                      </div>
                      <div class="menu-right" @click.stop="addCard(item)">
                        <img src="http://p2.icaixiaochu.com/card.png" alt />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="more-goods" @click.stop="tonewarea">
                  <div class="content">
                    <p>查看更多</p>
                    <img src="https://img.icaixiaochu.com/76BRQDjYW5N60AnQ" alt />
                  </div>
                </div>
              </div>
            </scroll-view>
          </div>
        </div>
      </div>
      <floor />
      <div class="hot-container">
        <recommend :goods="recommendGoods" />
      </div>
    </div>
  </div>
</template>

<script>
import brand from '@/components/brand'
import banner from '@/components/bannerslide'
import floor from '@/components/floor'
import { setTabBarBadge } from '@/utils'
import { reverseGeocoder } from '@/utils/address'
import recommend from '@/components/recommend'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import QQMapWX from 'qqmap-wx-jssdk'
const qqMapSdk = new QQMapWX({
  key: '5GXBZ-7PPWJ-UM6F2-K7AUH-KPQNQ-CFBE5'
})
export default {
  data () {
    return {
      newSkulist: [],
      location: '',
      navlist: [],
      banner: [],
      recommendGoods: [],
      countDownList: [],
      limit: [],
      goodsList: [{ actEndTime: '' }],
      countDownTime: '',
      page: 1,
      loading: false,
      Activity: []
    }
  },
  computed: {
    ...mapGetters(['data', 'cityName', 'city', 'cart', 'cartInfos'])
  },
  components: {
    brand,
    banner,
    floor,
    recommend
  },
  onReachBottom () {
    if (this.loading) {
      this.page++
      this.loading = false
      this.getHotGoods(this.page)
    }
  },
  onShow () {
    if (this.cartInfos.num >= 1) {
      setTabBarBadge(`${this.cartInfos.num}`)
    } else {
      wx.removeTabBarBadge({
        index: 3
      })
    }
  },
  mounted () {
    this.getCurLocation()
    this.getHotGoods()
    this.getprodectlist()
    this.appInfo()
    let _this = this
    wx.getSystemInfo({
      success: result => {
        if (result.model.search('iPhone X') != -1) {
          _this.globalData.isIPX = true
        }
        wx.setStorageSync('model', result.model)
      },
      fail: () => {},
      complete: () => {}
    })
  },
  methods: {
    getHotGoods (page = 1) {
      this.$http.get('/fetchHotGoods', { page }).then(res => {
        if (res.data.length < 1 && this.page >= 1) {
          wx.showToast({
            title: '没有商品了',
            icon: 'none',
            duration: 2000
          })
          return
        }
        this.loading = true
        this.recommendGoods = Object.freeze(
          this.recommendGoods.concat(res.data)
        )
      })
    },
    appInfo () {
      this.$http.post('/getNav').then(res => {
        this.Activity = res.data
        this.countDown()
      })
    },
    Result (data) {
      let ret = []
      ret.push(...data)
      return ret
    },
    timeFormat (param) {
      return param < 10 ? '0' + param : param
    },
    countDown () {
      let newTime = new Date().getTime()
      let countDownTime = this.Activity[0].time
      let endTime = new Date(countDownTime).getTime()
      let obj = null
      if (endTime - newTime > 0) {
        let time = (endTime - newTime) / 1000
        let day = parseInt(time / (60 * 60 * 24))
        let hou = parseInt((time % (60 * 60 * 24)) / 3600)
        let min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60)
        let sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60)
        obj = {
          day: this.timeFormat(day),
          hou: this.timeFormat(hou),
          min: this.timeFormat(min),
          sec: this.timeFormat(sec)
        }
      } else {
        // 活动已结束，全部设置为'00'
        this.appInfo()
        return
      }

      this.countDownTime = obj
      setTimeout(this.countDown, 1000)
    },
    addCard (item) {
      this.create_db(item)
    },
    ...mapActions(['create_db']),
    toAddresPage () {
      wx.navigateTo({
        url: `../setlocation/main`
      })
    },
    ...mapMutations({
      setCityname: 'SET_CITYNAME',
      setCity: 'SET_CITY'
    }),
    toCoupon () {
      wx.navigateTo({
        url: `../coupon/main`
      })
    },
    toDiscount () {
      wx.navigateTo({
        url: `../discount/main`
      })
    },
    toActivity () {
      wx.navigateTo({
        url: `../activity/main`
      })
    },
    getprodectlist () {
      this.$http.get('/getIndexHead').then(res => {
        this.banner = res.data.slide_show
        this.navlist = res.data.navlist
        this.$http.get('/getNewGoods').then(res => {
          this.newSkulist = res.data
        })
      })
      wx.stopPullDownRefresh()
    },
    jumpCatogory (item) {
      wx.navigateTo({
        url: `../categorydata/main?id=${item.id}`
      })
    },
    navtodetail (item) {
      wx.navigateTo({
        url: `../goods/main?id=${item.goods_id}`
      })
    },
    toSearchPage () {
      wx.navigateTo({
        url: `../search/main`
      })
    },
    tonewarea () {
      wx.navigateTo({
        url: `../newarea/main`
      })
    },
    ...mapActions(['setUser', 'InfoCart']),
    getCurLocation () {
      reverseGeocoder(qqMapSdk).then(res => {
        this.setCityname(res.result.address)
        this.cityList = res.result.pois
        this.city = res.result.address_component.city
      })
    }
  },
  onPullDownRefresh () {
    this.page = 1
    this.getHotGoods()
    this.getprodectlist()
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '菜小厨生鲜商城',
      path: 'pages/index/main'
    }
  }
}
</script>
<style lang="less" scoped>
@import "./style";
</style>
