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
        <div class="location-title">
          <p>附近地址</p>
          <div class="position" @click="refreshPosition">
            <img src="http://p2.icaixiaochu.com/position.png" alt>
            <p>重新定位</p>
          </div>
        </div>
        <div
          class="addressGroup"
          v-for="(item, index) in cityList"
          :key="index"
          @click="setLocathost(item)"
        >
          <p>{{item.address}}</p>
        </div>
      </div>
    </div>
    <div class="newAddress" @click="addAddress">新增收货地址</div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import QQMapWX from 'qqmap-wx-jssdk'
import {reverseGeocoder} from '@/utils/address'
import { dobounce } from '../../utils/util'
import util from '@/utils/util'
const qqMapSdk = new QQMapWX({
  key: '5GXBZ-7PPWJ-UM6F2-K7AUH-KPQNQ-CFBE5'
})
export default {
  components: {},
  computed: {
    ...mapGetters(['data', 'cityName'])
  },
  data () {
    return {
      address: [],
      cityList: [],
      keywords: '',
      city: ''
    }
  },
  mounted () {
    this.getCurLocation()
  },
  methods: {
    ...mapMutations({
      setCityname: 'SET_CITYNAME',
      setCity: 'SET_CITY'
    }),
    setLocathost (item) {
      this.setCityname(item.address)
      wx.navigateBack({ changed: true })
    },
    refreshPosition () {
      this.getCurLocation()
    },
    getCurLocation () {
      reverseGeocoder(qqMapSdk).then(res => {
        this.setCityname(res.result.address)
        this.cityList = res.result.pois
        this.city = res.result.address_component.city
      })
    },
    getSuggestion () {
      let _this = this
      qqMapSdk.getSuggestion({
        keyword: this.keywords,
        policy: 1,
        region: this.city,
        success: function (res) {
          _this.cityList = res.data
        }
      })
    },
    addAddress () {
      util.checkLogin(`../addaddress/main`)
    }
  },
  onShow () {
    this.$watch(
      'keywords',
      dobounce(newVal => {
        this.getSuggestion()
      }, 500)
    )
  }
}
</script>
<style lang="less" scoped>
@import "./style.less";
</style>
