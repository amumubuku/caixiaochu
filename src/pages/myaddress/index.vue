<template>
  <div class="my-address">
    <div class="address-wrp">
      <div
        class="address-item"
        v-for="(item, index) in address"
        :key="index"
        @click="selectAddress(item)"
      >
        <div class="address-info">
          <!-- :style="{backgroundColor: item.position.backgroundColor, color: item.position.textColor}" -->
          <div
            class="address-position"
            :class="[ item.is_default == 1? 'is-default':item.label ==0? 'small-2': item.label ==1?'small-3' :item.label == 2? 'small-1': 'small-4']"
          >{{ item.is_default ==1?'默认':item.label ==0?'住宿':item.label==1? '学校':item.label==2?'公司':'其他'}}</div>
          <div class="address-content">
            <div class="top-content">
              <div class="user-name">{{item.name}}</div>
              <div class="user-phone">{{item.tel}}</div>
            </div>
            <div class="address-des">{{item.city}}-{{item.address}}</div>
          </div>
        </div>
        <div class="address-fuc">
          <div class="delete" @click.stop="deleteAddress(item.id)">
            <img src="http://img.icaixiaochu.com/delete.png" alt />
          </div>
          <div class="edit" @click.stop="edit(item)">
            <img src="http://img.icaixiaochu.com/edit.png" alt />
          </div>
        </div>
      </div>
    </div>
    <div class="null-address" v-if="!address.length >= 1">
      <img src="https://img.icaixiaochu.com/42stdFgUrrxlKDKE.png" alt />

      <span>您还没有收货地址!马上添加吧!</span>
    </div>
    <div class="add-address" @click="addAddress">
      <img src="https://img.icaixiaochu.com/addAddr.png" alt />
      <p>新增收货地址</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      address: []
    }
  },
  computed: {
    ...mapGetters(['data'])
  },
  components: {},
  onShow () {
    this.getAddress()
  },
  onPullDownRefresh () {
    this.getAddress()
  },
  methods: {
    selectAddress (item) {
      var pages = getCurrentPages()
      var currentPage = pages[pages.length - 2]
      var url = currentPage.route
      if (url === 'pages/order/main') {
        this.setDefaultAddress(item)
        wx.navigateBack({ changed: true })
      }
    },
    edit (item) {
      wx.navigateTo({
        url: `../addaddress/main?id=${item.id}`
      })
    },
    deleteAddress (addressid) {
      var _this = this
      wx.showModal({
        title: '提示',
        content: '确定删除收货地址?',
        success (res) {
          if (res.confirm) {
            _this.$http
              .post('/removeAddress', {
                address_id: addressid
              })
              .then(res => {
                _this.getAddress()
              })
          } else if (res.cancel) {
          }
        }
      })
    },
    addAddress () {
      wx.navigateTo({
        url: `../addaddress/main`
      })
    },
    ...mapMutations({
      setDefaultAddress: 'SET_DfAD'
    }),
    getAddress () {
      this.$http.post('/fetchAddress').then(res => {
        this.address = res.data
        wx.stopPullDownRefresh()
      })
    }
  }
}
</script>
<style lang="less">
@import "./style";
</style>
