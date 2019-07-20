<template>
  <div class="refunded" v-if="orderDetail">
    <div class="refunded-wrp">
      <div class="refunded-head">
        <div class="refunded-head-left">
          <img src="https://img.icaixiaochu.com/small.png" alt />
          <p>退款原因</p>
        </div>
        <div class="refunded-head-right" @click="toggleOpt('show')">
          <p>{{causeTitle||'请选择退款原因'}}</p>
          <img src="https://img.icaixiaochu.com/select-icon.png" alt />
        </div>
      </div>
      <div class="upload-wrp">
        <div class="note-wrp">
          <p>留言:</p>
          <input type="text" v-model="noteText" placeholder="最多可输入150字" />
        </div>
        <div class="img-list">
          <div
            class="img-item"
            v-for="(item, index) in selectImgs"
            :key="index"
            @click="previewImage(item)"
          >
            <img :src="item" alt />
            <div class="delete" @click.stop="deteleImg(index)">
              <img src="https://img.icaixiaochu.com/detele-icon.png" alt="">
            </div>
          </div>
          <div class="select-img" @click="chooseImage">
            <img src="https://img.icaixiaochu.com/camera-icon.png" alt />
            <p>添加图片</p>
          </div>
        </div>
      </div>
      <div class="goods-wrp">
        <div class="goods-head">
          <img src="https://img.icaixiaochu.com/small.png" alt />
          <p>选择退款商品</p>
        </div>
        <div class="goods-list">
          <div class="good-item" v-for="(item, index) in goods" :key="index">
            <div class="order-detail">
              <div class="select-box" @click="toggleSelect(item)">
                <p class="circle" v-show="!item.select"></p>
                <img v-show="item.select" src="https://img.icaixiaochu.com/121.png" alt />
              </div>
              <div class="good-cover">
                <img :src="item.cover" alt />
              </div>
              <div class="good-des">
                <p>{{item.goods_title}}</p>
                <p class="num">数量X{{item.number}}</p>
              </div>
            </div>
            <div class="good-price">
              <p>¥{{item.real_price}}</p>
            </div>
          </div>
        </div>
        <div class="fee-box">
          <div class="fee-left">
            <p class="text1">配送费</p>
            <p class="text2">部分退款，配送费不退回</p>
          </div>
          <div class="fee-right">
            <p>¥{{orderDetail.extends.shipping_fee}}</p>
          </div>
        </div>
      </div>

      <div class="select-goods">
        <div class="all-select" @click="allSelect">
          <p class="circle" v-show="!selectState"></p>
          <img v-show="selectState" src="https://img.icaixiaochu.com/121.png" alt />
          <p class="title">全选商品</p>
        </div>
        <div class="price-wrp">
          <p>退款金额</p>
          <div>
            <i style="font-size:13px;">¥</i>{{total}}
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="footer-row-left">
        <p>退款金额</p>
        <div>
          <i style="font-size:13px;">¥</i>{{ price}}
        </div>
      </div>
      <div class="footer-row-right" @click="submitRefunded">提交</div>
    </div>
     <popup ref="optOnCancel" type="bottom" className="opt-oncancel">
      <div class="options-list">
        <div class="opt-item" v-for="(item, index) in causes" :key="index" @click="selectCause(item)">{{item.title}}</div>
        <div class="cancel" @click="toggleOpt('hide')">取消</div>
      </div>
    </popup>
  </div>
</template>

<script>
import popup from '@/components/popup'
export default {
  data () {
    return {
      noteText: '',
      selectImgs: [],
      uploadImgs: [],
      selectState: false,
      causes: [],
      causeId: '',
      causeTitle: '',
      orderDetail: '',
      orderId: '',
      goods: [],
      price: ''
    }
  },
  computed: {
    total () {
      if (!this.orderDetail) {
        return false
      }
      let total = 0
      let selectState = this.goods.every(ele => ele.select)
      let fee = parseFloat(this.orderDetail.extends.shipping_fee)
      this.goods.forEach(element => {
        if (element.select) {
          total += parseFloat(element.real_price)
        }
      })

      if (total) {
        this.price = selectState ? (total + fee).toFixed(2) : total
      }
      return total < 0.001 ? 0 : (total - (selectState ? 0 : fee)).toFixed(2)
    }
  },
  components: { popup },
  mounted () {
    this.orderId = this.$root.$mp.query.id
    this.getOrderDetail()
  },
  methods: {
    deteleImg (index) {
      this.selectImgs.splice(index, 1)
      this.uploadImgs.splice(index, 1)
    },
    getOrderDetail () {
      this.$http.post('/orderDetail', { order_id: this.orderId }).then(res => {
        let orderDetail = res.data
        orderDetail.goods.forEach(ele => {
          ele.select = false
        })
        this.orderDetail = orderDetail
        this.goods = orderDetail.goods
      })
    },
    selectCause (item) {
      this.causeId = item.id
      this.causeTitle = item.title
      this.toggleOpt('hide')
    },
    toggleOpt (state) {
      if (state === 'show') {
        this.$http.post('/fetchCause').then(res => {
          this.causes = res.data
        })
      }
      this.$refs.optOnCancel.toggle(state)
    },
    toggleSelect (item) {
      var curId = this.goods.findIndex(ele => {
        return ele.goods_id === item.goods_id
      })

      this.goods[curId].select = !this.goods[curId].select
      this.selectState = this.goods.every(ele => ele.select)
    },
    allSelect () {
      var selectState = this.goods.every(ele => ele.select
      )
      this.goods.forEach(element => {
        element.select = !selectState
      })
      this.selectState = !selectState
    },
    chooseImage () {
      let _this = this
      if (_this.selectImgs.length >= 3) {
        wx.showToast({
          title: '只能上传3张图片',
          icon: 'none',
          image: '',
          duration: 1500,
          mask: false,
          success: (result) => {

          },
          fail: () => {},
          complete: () => {}
        })
        return
      }
      wx.chooseImage({
        count: 3 - _this.selectImgs.length,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: result => {
          _this.selectImgs = _this.selectImgs.concat(result.tempFilePaths)
          this.upload(result.tempFilePaths)
        },
        fail: () => {},
        complete: () => {}
      })
    },
    previewImage (imgUrl) {
      wx.previewImage({
        current: imgUrl, // 当前显示图片的http链接
        urls: this.selectImgs// 需要预览的图片http链接列表
      })
    },
    upload (data) {
      let token = wx.getStorageSync('token') || ''
      data.forEach(element => {
        wx.uploadFile({
          url: 'https://icaixiaochu.com/api/upload',
          filePath: element,
          name: '111',
          formData: {
            token
          },
          success: (result) => {
            this.uploadImgs.push(JSON.parse(result.data).data)
          },
          fail: (err) => {
            console.log(err)
          },
          complete: () => {}
        })
      })
    },
    Isselect () {
      this.goods.forEach(element => {
        if (element.select) {
          return true
        }
      })
      return false
    },
    submitRefunded () {
      if (!this.causeId) {
        wx.showToast({
          title: '请选择退款原因',
          icon: 'none',
          duration: 1500,
          mask: false,
          success: (result) => {

          },
          fail: () => {},
          complete: () => {}
        })
        return false
      }
      this.goods.forEach(element => {
        if (element.select) {

        }
      })
      if (!this.Isselect) {
        wx.showToast({
          title: '请选择退款商品',
          icon: 'none',
          duration: 1500,
          mask: false,
          success: (result) => {

          },
          fail: () => {},
          complete: () => {}
        })
        return false
      }
      let goodIds = this.goods.filter(ele => ele.select).map(ele => ele.id).join(',')
      let imgs = this.uploadImgs.join(',')
      let orderId = this.orderDetail.order_id
      let causeId = this.causeId
      let formData = {
        order_goods_id: goodIds,
        content: this.noteText,
        order_id: orderId,
        image: imgs,
        cause_id: causeId
      }
      this.$http.post('/applyRefund', formData).then(res => {
        if (res.status) {
          wx.navigateTo({
            url: `../refundeddetail/main?id=${this.orderId}`,
            success: (result) => {
            },
            fail: () => {},
            complete: () => {}
          })
        }
      })
    }

  }
}
</script>
<style lang="less">
@import "./style";
</style>
