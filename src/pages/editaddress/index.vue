<template>
  <div class="address-wrp">
     <div class="address-item">
      <p>联系人</p>
      <div class="input-content">
        <input type="text" placeholder="姓名" v-model="addressInfo.name">
      </div>
    </div>
    <div class="address-item">
      <p>手机号码</p>
      <div class="input-content">
        <input type="text" placeholder="11位电话号码" v-model="addressInfo.tel">
      </div>
    </div>
    <div class="select-city" @click="chooseAddr">
      <div class="select-row">
        <p class="city">选择城市</p>
        <p>{{addressInfo.city}}</p>
      </div>
      <img src="http://p2.icaixiaochu.com/more.png" alt >
    </div>
    <div class="address-item">
      <p>详细地址</p>
      <div class="input-content">
        <input type="text" placeholder="详情收货地址" v-model="addressInfo.address">
      </div>
    </div>
      <div class="address-item">
        <p>地址标签</p>
        <div class="label">
          <div
            class="label-type"
            :class="addressInfo.label == 0 ? 'active' : ''"
            @click="toggle(0)"
          >住宅</div>
          <div
            class="label-type"
            :class="addressInfo.label == 1 ? 'active' : ''"
            @click="toggle(1)"
          >学校</div>
          <div
            class="label-type"
            :class="addressInfo.label == 2 ? 'active' : ''"
            @click="toggle(2)"
          >公司</div>
          <div
            class="label-type"
            :class="addressInfo.label == 3 ? 'active' : ''"
            @click="toggle(3)"
          >其他</div>
        </div>
      </div>
    <div class="savaaddress">
      <div class="cancel" @click="back">取消</div>
      <div class="save" @click="savaAddress">确认</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      addressId: 0,
      addressInfo: {}
    }
  },
  computed: {
    ...mapGetters(['address'])
  },
  methods: {
    chooseAddr () {
      wx.chooseLocation({
        success: (res) => {
          let pos = {
            lat: res.latitude.toString(),
            lng: res.longitude.toString()
          }
          let address = res.name
          this.$http.post('/inDistance', pos).then(res => {
            if (res.status === 1) {
              this.addressInfo.lng = pos.lng
              this.addressInfo.lat = pos.lat
              this.addressInfo.city = address
            }
          })
        }
      })
    },
    toggle (index) {
      this.addressInfo.label = index
    },
    back () {
      wx.navigateBack({ changed: true })
    },
    savaAddress () {
      this.$http.post('/editAddress', this.addressInfo).then(res => {
        if (res.status === 1) {
          wx.showToast({
            title: '修改地址成功',
            icon: 'success',
            duration: 2000
          })
          wx.navigateBack({ changed: true })
        }
      })
    },
    getAddressInfo () {
      this.$http.post('/getAdr', {
        address_id: this.addressId
      }).then(res => {
        this.addressInfo = res.data
        this.addressInfo.address_id = res.data.id
      })
    }
  },
  mounted () {
    this.addressId = this.$root.$mp.query.id
    this.getAddressInfo()
  }
}
</script>
<style lang="less" scoped>
@import './style.less';

</style>
