<template>
  <div class="address">
    <div class="address-wrp">
      <div class="header">
        <div class="header-wrp">
          <div class="location-box">
            <img src="http://pox5hitq5.bkt.clouddn.com/Positioning.png" alt class="location-icon">
            <p>{{cityName}}</p>
            <img src="http://pox5hitq5.bkt.clouddn.com/drop-down.png" alt>
          </div>
          <form class="form" @click="toSearchPage">
            <div class="btn">
              <img src="http://pox5hitq5.bkt.clouddn.com/search.png" alt>
              <span>番茄炒鸡蛋</span>
            </div>
          </form>
        </div>
      </div>
      <div class="address-info">
        <div class="my-address">我的收货地址</div>
        <div class="addressGroup" v-for="(item, index) in address" :key="index">
          <div class="group-left">
            <div class="address">
              <p class="address-name">{{item.name}}</p>
              <p>{{item.mobile}}</p>
            </div>
            <div class="address-des">{{item.address}}</div>
          </div>
          <div class="group-right">
            <div class="address-edit">
              <img src="http://ppoaxj723.bkt.clouddn.com/more.png" alt>
            </div>
          </div>
        </div>
        <div class="more"><p>展开更多</p> <img src="http://ppoaxj723.bkt.clouddn.com/drop-down.png" alt=""></div>
      </div>
      <div class="location-info">
        <div class="location-title">附近地址</div>
        <div class="addressGroup" v-for="(item, index) in city" :key="index">
          <p>{{item.address}}</p>
        </div>
      </div>
    </div>
    <div class="newAddress">新增收货地址</div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import card from '@/components/card'
import { get } from '../../utils'
export default {
  components: {
    card
  },
  computed: {
    ...mapGetters(['data', 'cityName', 'city'])
  },
  data () {
    return {
      logs: [],
      address: []
    }
  },
  methods: {
    ...mapMutations({
      setCityname: 'SET_CITYNAME',
      setCity: 'SET_CITY'
    }),
    getAddress () {
      get('/getaddress').then(res => {
        this.address = res.list
      })
    }
  },
  mounted () {
    this.getAddress()
  }
}
</script>
<style lang="less" scoped>
@import './style.less';

</style>
