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
      <div class="select-city" @click="selectCity">
        <div class="select-row">
          <p class="city">选择城市</p>
          <p>{{formData.city}}</p>
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
          <div class="label-type" :class="formData.label == 1 ? 'active' : ''" @click="toggle(1)">学校</div>
          <div class="label-type" :class="formData.label == 2 ? 'active' : ''" @click="toggle(2)">公司</div>
          <div class="label-type" :class="formData.label == 3 ? 'active' : ''" @click="toggle(3)">其他</div>
        </div>
      </div>

      <button type="primary" :disabled="disabledBtn" form-type="submit" class="savaaddress">保存地址</button>
    </form>
  </div>
</template>

<script>
import WeValidator from 'we-validator'
import { mapGetters, mapMutations } from 'vuex'
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
        lat: 0
      },
      disabledBtn: false
    }
  },
  computed: {
    ...mapGetters(['address'])
  },
  methods: {
    selectCity () {
      wx.navigateTo({
        url: `../selectaddress/main`
      })
    },
    ...mapMutations({
      setAddress: 'SET_ADDRESS'
    }),
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
            required: '请输入用户名'
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
            length: '请填写详细收货地址'
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
      let formData = this.formData

      // if (!this.validatorInstance.checkData(formData)) return
      this.$http.post('/editAddress', formData).then(res => {
        if (res.status === 1) {
          wx.navigateBack({ changed: true })
        }
      })
    }
  },
  onUnload () {
    this.setAddress('')
  },
  mounted () {
    this.initValidator()
  },
  onShow () {
    if (this.address) {
      let { lng, lat } = this.address.location
      this.formData.lng = lng
      this.formData.lat = lat
      this.formData.city = this.address.address
    }
  }
}
</script>
<style lang="less" scoped>
@import "./style.less";
</style>
