<template>
  <div class="service" v-if="serviceData">
    <div class="service-list" v-for="(orderItem, index) in serviceData" :key="index">
      <div class="goods-head">
        <img src="https://img.icaixiaochu.com/time-icon1.png" alt />
        <p>{{orderItem.refund_status ===0?'等待商家处理':orderItem.refund_status===1? '退款成功':orderItem.refund_status===2?'拒绝退款':'主动撤销退款'}}</p>
      </div>
      <div class="goods-list">
        <collapse :selected="true" :goods="orderItem.goods"></collapse>
      </div>
      <div class="handle-wrp">
        <div class="order-info">
          <span>共{{orderItem.goods.length}}件商品</span>
          <p>款项：{{orderItem.apply_money}}</p>
        </div>
        <div class="handle-col">
          <div class="handle-btn-detail" @click="refundDetail(orderItem.order_id)">查看详情</div>
          <div
            class="handle-btn-del"
            @click="deleteService(orderItem)"
            v-if="orderItem.refund_status >0"
          >删除订单</div>
        </div>
      </div>
    </div>
    <div class="null-service-wrp" v-if="!serviceData.length">
      <img src="https://img.icaixiaochu.com/order-bg.png" alt />
      <p>暂无售后订单</p>
    </div>
  </div>
</template>

<script>
import Collapse from '@/components/collapse'
export default {
  data () {
    return {
      noteText: '',
      imgList: [],
      selectState: false,
      serviceData: []
    }
  },
  computed: {
    activeColor () {
      return '#F47C85'
    },
    arrowColor () {
      return '12px solid  #F47C85'
    }
  },
  components: { Collapse },
  mounted () {
    this.serviceList()
  },
  methods: {
    deleteService (data) {
      console.log(data)
      let _this = this
      wx.showModal({
        title: '确认删除售后订单?',
        content: '删除后,售后订单不会在展示',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#797979',
        confirmText: '确定',
        confirmColor: '#FEA835',
        success: result => {
          if (result.confirm) {
            _this.$http.post('/', {}).then(res => {
              if (res.status) {
                _this.serviceList()
              }
            })
          }
        },
        fail: () => {},
        complete: () => {}
      })
    },
    refundDetail (id) {
      wx.navigateTo({
        url: `../refundeddetail/main?id=${id}`,
        success: result => {},
        fail: () => {},
        complete: () => {}
      })
    },
    cancelRefunded () {
      wx.showModal({
        title: '确认撤销退款申请',
        content: '撤销后，将无法再次申请',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#797979',
        confirmText: '确定',
        confirmColor: '#FEA835',
        success: result => {
          if (result.confirm) {
            console.log(1)
          }
        },
        fail: () => {},
        complete: () => {}
      })
    },
    serviceList () {
      this.$http.post('/listRefund').then(res => {
        this.serviceData = res.data
        wx.stopPullDownRefresh()
      })
    },
    toggleOpt (state) {
      this.$refs.optOnCancel.toggle(state)
    },
    toggleSelect (item) {
      var curId = this.goods.findIndex(ele => {
        return ele.goods_id === item.goods_id
      })

      this.goods[curId].select = !this.goods[curId].select
      this.selectState = this.goods.every(ele => {
        return ele.select
      })
    },
    allSelect () {
      var selectState = this.goods.every(ele => {
        return ele.select
      })
      this.goods.forEach(element => {
        element.select = !selectState
      })
      this.selectState = !selectState
    },
    chooseImage () {
      let _this = this
      wx.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: result => {
          _this.imgList = _this.imgList.concat(result.tempFilePaths)
        },
        fail: () => {},
        complete: () => {}
      })
    },
    previewImage () {
      wx.previewImage({
        current: 'https://img.icaixiaochu.com/map-img.png', // 当前显示图片的http链接
        urls: ['https://img.icaixiaochu.com/map-img.png'] // 需要预览的图片http链接列表
      })
    }
  },
  onPullDownRefresh () {
    this.serviceList()
  }
}
</script>
<style lang="less">
@import "./style";
</style>
