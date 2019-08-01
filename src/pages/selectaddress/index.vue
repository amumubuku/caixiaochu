<template>
  <div class="address">
    <div class="address-wrp">
      <div class="header">
        <div class="header-wrp">
          <div class="location-box">
            <img src="http://p2.icaixiaochu.com/location.png" alt class="location-icon">
            <p>{{cityName}}</p>
            <img src="http://p2.icaixiaochu.com/down.png" alt>
          </div>
          <form class="form" @click="toSearchPage">
            <div class="input-wrp">
              <input type="text" placeholder="请输入地址" v-model="keywords" class="input">
            </div>
          </form>
        </div>
      </div>
      <div class="location-info">
        <div
          class="addressGroup"
          v-for="(item, index) in city"
          :key="index"
          @click="selectAddress(item)"
        >
          <p class="address">{{item.title}}</p>
          <p class="district">{{item.address}}</p>
        </div>
      </div>
      <button open-type="openSetting" @opensetting="opensetting" v-if="!city.length>= 1">打开授权设置页</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { dobounce } from '../../utils/util'
import QQMapWX from 'wx-qqmap-jssdk'
import {reverseGeocoder} from '@/utils/address'
const qqMapSdk = new QQMapWX({
  key: '5GXBZ-7PPWJ-UM6F2-K7AUH-KPQNQ-CFBE5'
})
export default {
  computed: {
    ...mapGetters(['data', 'cityName', 'city'])
  },
  data () {
    return {
      city: [],
      keywords: '',
      location: '113.546111,22.793741'
    }
  },
  methods: {
    ...mapMutations({
      setCityname: 'SET_CITYNAME',
      setCity: 'SET_CITY',
      setAddress: 'SET_ADDRESS'
    }),
    selectAddress (item) {
      this.$http.post('/inDistance', item.location).then(res => {
        if (res.status === 0) {
          wx.showToast({
            title: res.info,
            icon: '',
            duration: 2000
          })
          return false
        } else {
          this.setAddress(item)
          wx.navigateBack({ changed: true })
        }
      })
      this.setAddress(item)
    },
    getCurLocation () {
      // 调用接口
      let location = wx.getStorageSync('location')
      reverseGeocoder(qqMapSdk, location).then(res => {
        console.log(res)
        this.setCityname(res.result.address)
        // this.cityList = res.result.pois
        this.city = res.result.pois
      })
    },
    // getCurLocation () {
    //   let _this = this
    //   wx.getLocation({
    //     type: 'gcj02 ',
    //     success: function (res) {
    //       // 调用接口
    //       qqMapSdk.reverseGeocoder({
    //         location: {
    //           latitude: res.latitude,
    //           longitude: res.longitude
    //         },
    //         get_poi: 1,
    //         success: function (res) {
    //           _this.setCityname(res.result.address)
    //           _this.city = res.result.pois
    //         }
    //       })
    //     }
    //   })
    // },
    getSuggestion () {
      let _this = this
      qqMapSdk.getSuggestion({
        keyword: this.keywords,
        policy: 1,
        success: function (res) {
          _this.city = res.data
        }
      })
    }
  },
  onShow () {
    this.getCurLocation()
    this.$watch(
      'keywords',
      dobounce(newVal => {
        this.value = newVal
        this.getSuggestion()
      }, 500)
    )
  }
}
</script>
<style lang="less" scoped>
@import "./style.less";
</style>
