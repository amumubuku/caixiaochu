<template>
  <div class="app">
    <div class="header">
      <div class="header-wrp">
        <div class="location-box" @click="toAddresPage">
          <img src="http://p2.icaixiaochu.com/location.png" alt class="location-icon">
          <p>{{cityName}}</p>
          <img src="http://p2.icaixiaochu.com/down.png" alt>
        </div>
        <form class="form" @click="toSearchPage">
          <div class="btn">
            <img src="http://p2.icaixiaochu.com/search.png" alt>
            <span>请输入关键字</span>
          </div>
        </form>
      </div>
    </div>
    <div class="app-wrp">
       <brand/>
      <banner :data="banner"/>
      <div class="catogory">
        <div class="catogory-wrp">
          <div
            class="catogory-item"
            v-for="(item,index) in navlist"
            :key="index"
            @click="jumpCatogory(item)"
          >
            <img :src="item.icon" alt>
            <p>{{item.title}}</p>
          </div>
        </div>
      </div>
      <div class="activity">
        <div class="activity-left" @click="toActivity">
          <div class="head">
            <h4>限时抢</h4>
            <div class="time-row">
              <div class="time-col">{{countDownArr[0].hou}}</div>:
              <div class="time-col">{{countDownArr[0].min}}</div>:
              <div class="time-col">{{countDownArr[0].sec}}</div>
            </div>
          </div>
          <p>{{limit.hour}}点场 距离下场还有</p>
          <img :src="limit.image" alt>
        </div>
        <div class="activity-right">
          <div class="top" @click="toDiscount">
            <div class="info">
              <p>店长推荐</p>
              <span>好物多多不容错过</span>
              <text>去查看</text>
            </div>
            <div class="icon">
              <img src="http://img.icaixiaochu.com/shagnhaiqing.png" alt>
            </div>
          </div>
          <div class="but" @click="toCoupon">
            <div class="info">
              <p>领劵中心</p>
              <span>福利多多不容错过</span>
              <text>去领卷</text>
            </div>
            <div class="icon">
              <img src="http://p2.icaixiaochu.com/mOPLA7r1jzwMuisnw9Jk.png" alt>
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
              <img src="http://p2.icaixiaochu.com/more.png" alt class="more-icon">
            </div>
          </div>
          <div class="shop">
            <scroll-view width="100%" class="scroll" scroll-x="true">
              <div class="shop-list">
                <div
                  class="list"
                  v-for="(item,index) in newSkulist"
                  :key="index"
                  @click.stop="navtodetail(item)"
                >
                  <div class="item-top">
                    <img :src="item.cover" mode="scaleToFill" alt>
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
                        <img src="http://p2.icaixiaochu.com/card.png" alt>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </scroll-view>
          </div>
        </div>
      </div>
      <floor :skuitem="categoryAreaList"/>
      <div class="hot-container">
        <recommend :goods="recommend"/>
      </div>
    </div>
  </div>
</template>

<script>
import brand from '@/components/brand'
import banner from '@/components/bannerslide'
import floor from '@/components/floor'
import { setTabBarBadge } from '@/utils'
import {reverseGeocoder} from '@/utils/address'
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
      categoryAreaList: [],
      recommend: [],
      countDownList: [],
      limit: [],
      goodsList: [{actEndTime: ''}],
      countDownArr: [{}],
      page: 1,
      loading: true
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
      setTimeout(() => {
        this.getHotGoods()
      }, 70)
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
  },
  methods: {
    getHotGoods () {
      this.$http.get('/fetchHotGoods', {page: this.page}).then(res => {
        if (res.data.length < 1 && this.page > 1) {
          this.loading = false
          wx.showToast({
            title: '没有更多订单了',
            icon: 'none',
            duration: 2000
          })
          return
        }
        this.recommend = this.recommend.concat(res.data)
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
      let endTimeList = [this.limit.time]
      let countDownArr = []
      endTimeList.forEach(o => {
        let endTime = new Date(o).getTime()
        let obj = null
        if (endTime - newTime > 0) {
          let time = (endTime - newTime) / 1000
          let day = parseInt(time / (60 * 60 * 24))
          let hou = parseInt(time % (60 * 60 * 24) / 3600)
          let min = parseInt(time % (60 * 60 * 24) % 3600 / 60)
          let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60)
          obj = {
            day: this.timeFormat(day),
            hou: this.timeFormat(hou),
            min: this.timeFormat(min),
            sec: this.timeFormat(sec)
          }
        } else { // 活动已结束，全部设置为'00'
          obj = {
            day: '00',
            hou: '00',
            min: '00',
            sec: '00'
          }
        }
        countDownArr.push(obj)
      })
      this.countDownArr = countDownArr
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
      })
      this.$http.post('/getNextPurchase').then(res => {
        // console.log(Date.parse(new Date()), res.data.time)
        // res.data.time = formatTime(new Date(res.data.time * 1000))
        res.data.time = res.data.time
        this.goodsList[0].actEndTime = res.data.time
        this.limit = res.data
        this.countDown()
      })
      this.$http.get('/getIndexGoods').then(res => {
        this.categoryAreaList = res.data
      })
      this.$http.get('/getNewGoods').then(res => {
        this.newSkulist = res.data
      })
      wx.stopPullDownRefresh()
      // get('/index').then(res => {
      //   this.newSkulist = res.data.newSkulist.itemList
      //   this.navlist = res.data.navlist
      //   this.banner = res.data.banner
      //   this.categoryAreaList = res.data.categoryAreaList
      //   this.recommend = res.data.recommend
      // })
    },
    jumpCatogory (item) {
      wx.navigateTo({
        url: `../skulist/main?id=${item.id}`
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
      let _this = this
      reverseGeocoder(qqMapSdk).then(res => {
        _this.setCityname(res.result.address)
        _this.cityList = res.result.pois
        _this.city = res.result.address_component.city
      })
    }
  },
  onPullDownRefresh () {
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
