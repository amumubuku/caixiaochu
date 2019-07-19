<template>
  <div class="goods" v-if="goods">
    <navigation-bar
      :title="'商品详情'"
      :navBackgroundColor="'#fff'"
      :titleColor="'#000'"
      :back-visible="true"
      :home-path="'/pages/index/main'"
    ></navigation-bar>
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
            v-for="(item,index) of goods.slide_image"
            :key="item.id"
            class="swiper-item"
            @click="previewImage(index)"
          >
            <img :src="item" mode="aspectFill" />
          </swiper-item>
        </swiper>
        <div class="dots" v-if="goods.slide_image.length > 1">
          <span
            class="dot"
            v-for="(item, index) in goods.slide_image"
            :key="index"
            :class="[index === curIndex ? 'disable' : '']"
          ></span>
        </div>
      </div>
      <div class="good-content">
        <div class="good-content-wrp">
          <div class="good-info">
            <div class="good-row-top">
              <div class="price-box">
                <span
                  class="normal-price"
                >¥{{user.is_vip && goods.sku[0].vip_price > 1 ? goods.sku[0].vip_price : goods.sku[0].market_price}}</span>
                <span class="price">¥{{goods.sku[0].normal_price}}</span>
              </div>
              <div class="activity-box">
                <span>暂无活动</span>
                <span>尽请期待</span>
              </div>
            </div>
            <div class="good-row-but">
              <div class="good-sku-content">
                <div class="good-sku-left">
                  <p class="good-sku-name">{{goods.title}}</p>
                  <p class="good-sku-title">{{goods.description}}</p>
                  <div class="poster" @click="eventDraw">
                    <img src="https://img.icaixiaochu.com/post-img.png" alt />
                    <span>生成海报</span>
                  </div>
                </div>
                <div class="good-sku-right">
                  <button open-type="share" class="share">
                    <img src="https://img.icaixiaochu.com/share.png" alt />
                    <span>分享</span>
                  </button>
                </div>
              </div>
              <div class="good-sku-des">
                <p>浏览：{{goods.views}}</p>
                <p>库存：{{goods.stock}}</p>
                <p>已售：{{goods.sold}}</p>
              </div>
            </div>
          </div>
          <div class="sku-ared-footer">
            <div class="sku-footer-left">
              <img src="https://img.icaixiaochu.com/time-icon2.png" alt class="icon" />
              <span>配送时间</span>
            </div>
            <span>
              现在下单，预计
              <span style="color:#F52D3C;">{{currentTime}}</span> 送达
            </span>
          </div>

          <div class="good-detail">
            <div class="switch-fuc">
              <div
                :class="curSwitch?'active-left switch-state' : 'switch-state'"
                @click="changState(1)"
              >
                <span>商品详情</span>
                <i class="tag-icon" v-show="curSwitch"></i>
              </div>
              <div
                :class="curSwitch?'switch-state' : 'switch-state active-right'"
                @click="changState(0)"
              >
                <span>用户评论</span>
                <i class="tag-icon" v-show="!curSwitch"></i>
              </div>
            </div>
            <div class="good-des">
              <wxParse
                :content="goods.detail"
                noData="没有商品详情"
                @navigate="navigate"
                v-if="curSwitch"
              />
            </div>

            <div class="good-comments" v-if="!curSwitch">
              <div class="comments-item">
                <!-- <div class="comments-top">
                  <div class="comments-left">
                    <div class="user-cover">
                      <img :src="user.avatar_url" alt />
                    </div>
                    <div class="user-name">{{user.nick_name}}</div>
                    <div class="comments-level">
                      <img src="https://img.icaixiaochu.com/1111@2x.png" alt />
                      <img src="https://img.icaixiaochu.com/1111@2x.png" alt />
                      <img src="https://img.icaixiaochu.com/1111@2x.png" alt />
                      <img src="https://img.icaixiaochu.com/1111@2x.png" alt />
                      <img src="https://img.icaixiaochu.com/%E6%98%9F_%E5%AE%9E@2x.png" alt />
                    </div>
                  </div>
                  <div class="comments-right">2019-07-12 19:30</div>
                </div>
                <div class="comments-des">
                  <div class="comments-text">
                    菜小厨生鲜商城上线啦，菜小厨生鲜商城上线啦，
                    菜小厨生鲜商城上线啦...
                  </div>
                  <div class="comments-imgs">
                    <img
                      src="https://img.icaixiaochu.com/79d8c9ca226e186847a59ee2258445e50f2ab8df1562224708.png"
                      alt
                    />
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <popup ref="buyPopup" type="bottom">
        <div class="buy-info">
          <div class="good-des">
            <div class="buy-content">
              <div class="good-cover">
                <img :src="goods.cover" alt />
              </div>
              <div class="good-price">
                <div class="price-col">
                  <p>¥{{goods.sku[0].market_price}}</p>
                  <p class="text">¥{{goods.sku[0].normal_price}}</p>
                </div>
                <div>库存:{{goods.stock}}</div>
              </div>
            </div>
            <div class="buy-num-row">
              <p>购买数量</p>
              <div class="numAction">
                <div class="action subtract extend" @click="subtract(index)"></div>
                <div class="value">{{number}}</div>
                <div class="action add extend" @click="add(index)"></div>
              </div>
            </div>
          </div>
          <div class="enter-buy" @click="createOrder">确定</div>
        </div>
      </popup>
      <popup ref="canvasdrawer" type="center">
        <div class="cover-wrp">
          <div class="good-cover">
            <img :src="shareImage" alt />
          </div>
          <div class="cover-footer">
            <button @click="hide" class="cancel">取消</button>
            <button @click="eventSave" class="save">保存到相册</button>
          </div>
        </div>
      </popup>
      <canvasdrawer :painting="painting" class="canvasdrawer" @getImage="eventGetImage" />
    </div>
    <div class="good-card" :class="{'nav-bar-view-ipx':isIPX}">
      <div class="card-left">
        <div class="to-home" @click="toHome">
          <img src="http://p2.icaixiaochu.com/home.png" alt />
          <p>首页</p>
        </div>
        <div class="to-card" @click="toCard">
          <img src="http://p2.icaixiaochu.com/card-icon.png" alt />
          <p>购物车</p>
        </div>
      </div>
      <div
        class="sold"
        v-if="goods.stock <= 0 || goods.purchase_status ==1"
      >{{goods.purchase_status===1?'限购商品':'已售罄'}}</div>
      <div class="card-right" v-else>
        <div class="add-card" @click.stop="addCard(goods)">加入购物车</div>
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
import { setStorageSync, getStorageSync } from '@/utils/storage'
import navigationBar from '@/components/navigationBar.vue'
let app = getApp()

export default {
  data () {
    return {
      goods: '',
      painting: {},
      shareImage: '',
      number: 1,
      good_id: '',
      curIndex: 0,
      currentTime: '',
      is_cart: true,
      isIPX: null,
      curSwitch: 1
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  onError (err) {
    console.log(err)
  },
  components: { popup, wxParse, formButton, navigationBar },
  methods: {
    changState (state) {
      this.curSwitch = state
    },
    Hour () {
      this.$http.post('/getHalfHour').then(res => {
        this.currentTime = res.data
      })
    },
    handleChange (e) {
      this.curIndex = e.mp.detail.current
    },
    previewImage (index) {
      let imgs = this.goods.slide_image

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
        let cover = this.goods.cover
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
              content: this.goods.title,
              fontSize: 19,
              color: '#1D1D1D',
              textAlign: 'left',
              top: 298,
              left: 44,
              bolder: true
            },
            {
              type: 'text',
              content: `¥${this.goods.sku[0].market_price}`,
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
        url: '../cart/main'
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
        goods_title: this.goods.title,
        cover: this.goods.cover,
        label: this.goods.label,
        number: this.number,
        price: this.goods.sku[0].normal_price,
        real_price:
          this.user.is_vip && this.goods.sku[0].vip_price > 1
            ? this.goods.sku[0].vip_price
            : this.goods.sku[0].market_price,
        sku_id: this.goods.sku[0].id
      }
      this.setGood([goods])
    },
    add () {
      if (this.goods.is_limit) {
        if (this.number >= this.goods.limit_num) {
          wx.showToast({
            title: `此商品限购${this.goods.limit_num}份`,
            icon: 'none',
            duration: 2000
          })
          return
        }
        this.number++
        return
      }

      this.number++
    },
    subtract () {
      if (this.number <= 1) {
        return
      }
      this.number--
    },
    goodDetail () {
      this.$http
        .get('/goodsDetail', {
          good_id: this.good_id
        })
        .then(res => {
          this.goods = res.data
        })
    },
    ...mapActions(['create_db', 'setGood'])
  },
  onUnload () {
    if (this.$refs.buyPopup) {
      this.$refs.buyPopup.toggle('hide')
    }
  },
  mounted (e) {
    this.Hour()
    let _this = this
    if (!_this.globalData.isIPX) {
      wx.getSystemInfo({
        success: result => {
          if (result.model.search('iPhone X') != -1) {
            _this.globalData.isIPX = true
          }
          wx.setStorageSync('model', result.model)
        },
        fail: () => {},
        complete: () => {}
      })
    }
    this.isIPX = _this.globalData.isIPX
    var goodId = ''
    var scene = wx.getLaunchOptionsSync().scene
    if (scene === 1012) {
      goodId = wx.getLaunchOptionsSync().query.scene
    } else {
      goodId = this.$root.$mp.query.id
    }
    if (goodId) {
      setStorageSync('goodId', goodId)
    } else {
      goodId = getStorageSync('goodId')
    }
    this.good_id = goodId
    this.goodDetail()
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
    }
    return {
      title: this.goods.title,
      path: `pages/goods/main?id=${this.good_id}`,
      imageUrl: this.goods.cover
    }
  }
}
</script>
<style lang="less" scoped>
@import "style.less";
</style>
