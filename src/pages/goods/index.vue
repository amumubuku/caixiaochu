<template>
  <div class="goods" v-if="skudetail">
    <div class="goods-wrp">
      <div class="good-banner">
        <swiper
          style="height:100%;width:100%;"
          autoplay="true"
          interval="2000"
          duration="500"
          circular="true"
          @change="handleChange($event)"
        >
          <swiper-item
            v-for="(item,index) of skudetail.slide_image"
            :key="item.id"
            class="swiper-item"
            @click="previewImage(index)"
          >
            <img :src="item" mode="scaleToFill">
          </swiper-item>
        </swiper>
        <div class="dots" v-if="skudetail.slide_image.length > 1">
          <span
            class="dot"
            v-for="(item, index) in skudetail.slide_image"
            :key="index"
            :class="[index === curIndex ? 'disable' : '']"
          ></span>
        </div>
      </div>
      <div class="sku-ared">
        <div class="sku-ared-top">
          <div class="sku-ared-box">
            <div class="sku-head-wrp">
              <div class="sku-ared-left">
                <p class="sku-ared-name">{{skudetail.title}}</p>
                <button open-type="share" class="share">
                  <img src="https://img.icaixiaochu.com/IeN6825wiivK5Vo5" alt>
                </button>
                <p class="sku-ared-title">{{skudetail.description}}</p>
              </div>
              <div class="sku-ared-right">
                <div class="sku-ared-share" @click="eventDraw">生成海报</div>
                <i class="sku-ared-icon">
                  <img src="http://p2.icaixiaochu.com/logo.png" alt>
                </i>
              </div>
            </div>
            <div class="sku-head-info">
              <div class="sku-info-left">
                <p
                  style="font-size:13px;color:#B2B2B2;text-decoration: line-through;"
                >¥{{skudetail.sku[0].normal_price}}</p>
                <div class="dash-price">
                  <p
                    class="discont-price"
                  >¥{{user.is_vip && skudetail.sku[0].vip_price > 1 ? skudetail.sku[0].vip_price : skudetail.sku[0].market_price}}</p>
                  <p class="unit">{{skudetail.label}}</p>
                </div>
              </div>
              <p>浏览：{{skudetail.views}}</p>
              <p>库存：{{skudetail.stock}}</p>
              <p>已售：{{skudetail.sold}}</p>
            </div>
          </div>
        </div>
        <div class="sku-ared-footer">
          <img src="http://p2.icaixiaochu.com/doubt.png" alt class="icon">
          <span>现在下单，预计{{currentTime}}送达</span>
        </div>
      </div>
      <div class="sku-detail-title">图文详情</div>
      <div class="sku-detail">
        <wxParse
          :content="skudetail.detail"
          noData="没有商品详情"
          @navigate="navigate"
        />
      </div>
      <popup ref="buyPopup" type="bottom">
        <div class="buy-info">
          <div class="good-des">
            <div class="buy-content">
              <div class="good-cover">
                <img :src="skudetail.cover" alt>
              </div>
              <div class="good-price">
                <div class="price-col">
                  <p>¥{{skudetail.sku[0].market_price}}</p>
                  <p class="text">¥{{skudetail.sku[0].normal_price}}</p>
                </div>
                <div>库存:{{skudetail.stock}}</div>
              </div>
            </div>
            <div class="buy-num-row">
              <p>购买数量</p>
              <div class="numAction">
                <div class="action subtract" @click="subtract(index)"></div>
                <div class="value">{{number}}</div>
                <div class="action add" @click="add(index)"></div>
              </div>
            </div>
          </div>
          <div class="enter-buy" @click="createOrder">确定</div>
        </div>
      </popup>
      <popup ref="canvasdrawer" type="center">
        <div class="cover-wrp">
          <div class="good-cover">
            <img :src="shareImage" alt>
          </div>
          <div class="cover-footer">
            <button @click="hide" class="cancel">取消</button>
            <button @click="eventSave" class="save">保存到相册</button>
          </div>
        </div>
      </popup>
      <canvasdrawer :painting="painting" class="canvasdrawer" @getImage="eventGetImage"/>
    </div>
    <div class="good-card">
      <div class="card-left">
        <div class="to-home" @click="toHome">
          <img src="http://p2.icaixiaochu.com/home.png" alt>
          <p>首页</p>
        </div>
        <div class="to-card" @click="toCard">
          <img src="http://p2.icaixiaochu.com/card-icon.png" alt>
          <p>购物车</p>
        </div>
      </div>
      <div class="sold" v-if="skudetail.stock <= 0">已售罄</div>
      <div class="card-right" v-if="skudetail.stock >=1">
        <div class="add-card" @click.stop="addCard(skudetail)">加入购物车</div>
        <div class="buy" @click.stop="buy">
          <form-button></form-button>立即购买
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import wxParse from 'mpvue-wxparse'
import util from '@/utils/util'
import popup from '@/components/popup'
import formButton from '@/components/form-button'
export default {
  data () {
    return {
      skudetail: '',
      painting: {},
      shareImage: '',
      number: 1,
      good_id: '',
      curIndex: 0,
      currentTime: '',
      is_cart: true
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  components: { popup, wxParse, formButton },
  methods: {
    Hour () {
      this.$http.post('/getHalfHour').then(res => {
        this.currentTime = res.data
      })
    },
    handleChange (e) {
      this.curIndex = e.mp.detail.current
    },
    previewImage (index) {
      let imgs = this.skudetail.slide_image

      wx.previewImage({
        current: index,
        // 数据源
        urls: imgs
      })
    },
    eventGetImage (event) {
      wx.hideLoading()
      this.shareImage = event.target.tempFilePath
    },
    async eventDraw () {
      if (!this.shareImage) {
        let qrcode = await this.$http.post('/getGoodsQrcode', {
          goods_id: this.good_id
        })
        wx.showLoading({
          title: '绘制分享图片中',
          mask: true
        })
        let cover = this.skudetail.cover
        this.painting = {
          width: 315,
          height: 472,
          clear: true,
          views: [
            {
              type: 'image',
              url: 'https://img.icaixiaochu.com/1.png',
              top: 0,
              left: 0,
              width: 315,
              height: 472
            },
            {
              type: 'image',
              url: 'https://img.icaixiaochu.com/2142342342.png',
              top: 69,
              left: 44,
              width: 247,
              height: 356
            },
            {
              type: 'image',
              url: 'https://img.icaixiaochu.com/123.png',
              top: 57,
              left: 32,
              width: 247,
              height: 356
            },
            {
              type: 'image',
              url: cover,
              top: 69,
              left: 44,
              width: 223,
              height: 223
            },
            {
              type: 'image',
              url: 'https://img.icaixiaochu.com/4.png',
              top: 46,
              left: 12,
              width: 76,
              height: 76
            },
            {
              type: 'text',
              content: this.skudetail.title,
              fontSize: 19,
              color: '#1D1D1D',
              textAlign: 'left',
              top: 298,
              left: 44,
              bolder: true
            },
            {
              type: 'text',
              content: `¥${this.skudetail.sku[0].market_price}`,
              fontSize: 15,
              color: '#F52D3C',
              textAlign: 'left',
              top: 326,
              left: 44,
              bolder: true
            },
            {
              type: 'text',
              content: '长按识别小程序查看该商品',
              fontSize: 12,
              color: '#404040',
              textAlign: 'left',
              top: 367,
              left: 44
            },
            {
              type: 'image',
              url: qrcode.data,
              top: 322,
              left: 197,
              width: 72,
              height: 72
            }
          ]
        }
      }
      this.$refs.canvasdrawer.toggle('show')
    },
    hide () {
      this.$refs.canvasdrawer.toggle('hide')
    },
    eventSave () {
      wx.saveImageToPhotosAlbum({
        filePath: this.shareImage,
        success (res) {
          wx.showToast({
            title: '保存图片成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
      this.hide()
    },
    toCard () {
      wx.switchTab({
        url: '../shop/main'
      })
    },
    toHome () {
      wx.switchTab({
        url: '../index/main'
      })
    },
    addCard (item) {
      if (this.user && this.is_cart) {
        this.is_cart = false
        let data = item
        let sku = Object.assign(data.sku[0])
        data.sku = sku
        this.create_db(data)
      } else {
        wx.showToast({
          title: '已经添加到购物车',
          icon: 'none',
          duration: 2000
        })
      }
    },
    buy () {
      this.$refs.buyPopup.toggle('show')
    },
    createOrder () {
      if (util.checkLogin(`../order/main`)) {
        return
      }
      let goods = {
        goods_id: this.good_id,
        goods_title: this.skudetail.title,
        cover: this.skudetail.cover,
        label: this.skudetail.label,
        number: this.number,
        price: this.skudetail.sku[0].normal_price,
        real_price:
          this.user.is_vip && this.skudetail.sku[0].vip_price > 1
            ? this.skudetail.sku[0].vip_price
            : this.skudetail.sku[0].market_price,
        sku_id: this.skudetail.sku[0].id
      }
      this.setGood([goods])
    },
    add () {
      this.number++
    },
    subtract () {
      if (this.number <= 0) {
        return
      }
      this.number--
    },
    getskudetail () {
      this.$http
        .get('/goodsDetail', {
          good_id: this.good_id
        })
        .then(res => {
          this.skudetail = res.data
        })
    },
    ...mapActions(['create_db', 'setGood'])
  },
  mounted () {
    this.good_id = this.$root.$mp.query.id || wx.getStorageSync('goodId')
    wx.setStorageSync('goodId', this.good_id)
    this.getskudetail()
    this.Hour()
  },
  onShow () {
    if (this.skudetail) {
      this.$refs.buyPopup.toggle('hide')
      this.getskudetail()
    }
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.skudetail.title,
      path: `pages/goods/main?id=${this.good_id}`,
      imageUrl: this.skudetail.cover
    }
  }
}
</script>
<style lang="less" scoped>
@import "style.less";
</style>
