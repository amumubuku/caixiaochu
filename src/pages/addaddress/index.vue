<template>
  <div class="add-address">
    <form @submit="savaaddress" class="address-wrp">
      <div class="address-item">
        <p>联系人</p>
        <div class="input-content">
          <input type="text" placeholder="姓名" v-model="formData.name">
        </div>
      </div>
      <div class="address-item">
        <p>手机号码</p>
        <div class="input-content">
          <input type="number" placeholder="11位电话号码" v-model="formData.tel">
        </div>
      </div>
      <div class="select-city" @click="chooseAddr">
        <div class="select-row">
          <p class="city">选择城市</p>
          <p class="address">{{formData.city}}</p>
          <div class="select-btn" v-if="!formData.city">点击选择</div>
        </div>
        <img src="http://p2.icaixiaochu.com/more.png" alt>
      </div>
      <div class="address-item">
        <p>详细地址</p>
        <div class="input-content">
          <input type="text" placeholder="详情收货地址" v-model="formData.address">
        </div>
      </div>
      <div class="address-item">
        <p>地址标签</p>
        <div class="label">
          <div class="label-type" :class="formData.label == 0 ? 'active' : ''" @click="toggle(0)">住宅</div>
          <div class="label-type" :class="formData.label == 1 ? 'active1' : ''" @click="toggle(1)">学校</div>
          <div class="label-type" :class="formData.label == 2 ? 'active2' : ''" @click="toggle(2)">公司</div>
          <div class="label-type" :class="formData.label == 3 ? 'active3' : ''" @click="toggle(3)">其他</div>
        </div>
      </div>
      <div class="address-default">
        <div class="addr-flex-right">
          <span class="tilte">设为默认地址</span>
          <span class="text" >每次购物时会优先定位该地址，方便您轻松购物</span>
        </div>
        <div class="addr-flex-left">
           <switch  :checked="formData.is_default" @change="change"/>
        </div>
      </div>

      <button type="primary" :disabled="disabledBtn" form-type="submit" class="savaaddress">保存地址</button>
    </form>
  </div>
</template>

<script>
import WeValidator from 'we-validator'
export default {
  data () {
    return {
      formData: {
        name: '',
        city: '',
        address: '',
        tel: '',
        label: 0,
        lng: 0,
        lat: 0,
        is_default: false
      },
      addressId: ''
    }
  },
  methods: {
    change (e) {
      this.formData.is_default = e.mp.detail.value
    },
    chooseAddr () {
      wx.chooseLocation({
        success: (res) => {
          let pos = {
            lat: res.latitude.toString(),
            lng: res.longitude.toString()
          }
          let address = res.address
          this.$http.post('/inDistance', pos).then(res => {
            if (res.status === 1) {
              this.formData.lng = pos.lng
              this.formData.lat = pos.lat
              this.formData.city = address
            }
          })
        }
      })
    },

    initValidator () {
      this.validatorInstance = new WeValidator({
        rules: {
          name: {
            required: true
          },
          tel: {
            required: true,
            mobile: true
          },
          city: {
            required: true
          },
          address: {
            required: true
          },
          label: {
            required: true,
            number: true
          },
          lng: {
            required: true,
            number: true
          },
          lat: {
            required: true,
            number: true
          }
        },
        messages: {
          name: {
            required: '请填写收货人名'
          },
          lng: {
            required: '添加地址发送错误'
          },
          lat: {
            required: '添加地址发送错误'
          },
          tel: {
            required: '请输入手机号',
            mobile: '手机号格式不正确'
          },
          city: {
            required: '请选择城市'
          },
          address: {
            required: '请填写详细收货地址'

          }
        }
      })
    },
    toggle (index) {
      this.formData.label = index
    },
    savaaddress () {
      if (!this.validatorInstance.checkData(this.formData)) {
        return
      }
      this.$http.post('/editAddress', this.formData).then(res => {
        if (res.status === 1) {
          wx.navigateBack({ changed: true })
        }
      })
    },
    getAddressInfo () {
      this.$http.post('/getAdr', {
        address_id: this.addressId
      }).then(res => {
        let address = res.data
        if (address.is_default) {
          address.is_default = true
        }
        address.address_id = address.id
        this.formData = address
      })
    }
  },
  mounted () {
    let addressId = this.$root.$mp.query.id
    if (addressId) {
      this.addressId = addressId
      this.getAddressInfo()
    }
    this.initValidator()
  }
}
</script>
<style lang="less">
@import "./style.less";
</style>
