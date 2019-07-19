<template>
  <div class="sku-container">
    <div class="skulist-wrp">
      <scroll-view
        class="good-list"
        scroll-y="true"
        enable-back-to-top="true"
        @scroll="scroll"
      >
        <div v-for="(item, index) in categoryGoodData" :key="index" @click="goodDetail(item)" class="sku-item">
          <div class="icon">
            <img :src="item.cover" mode="aspectFill" alt>
          </div>
          <div class="good-detal">
            <div class="good-top">
              <div class="good-info">
                <img class="tag-icon" :src="item.label_id" alt v-if="item.label_id">
                <text class="good-name">{{item.title}}</text>
              </div>
              <text class="good-title">{{item.description}}</text>
            </div>
            <div class="footer-menu">
              <div class="menu-left">
                <div class="price">
                  <span class="money">¥</span>
                  <span>{{item.sku.market_price}}</span>
                </div>
                <div class="dash-price-info">
                  <div
                    :class="item.sku.vip_price>1 ? 'dash-price' : 'dash-price small'"
                  >¥{{item.sku.vip_price>1 ? item.sku.vip_price : item.sku.normal_price}}</div>
                  <div class="vip-price" v-if="item.sku.vip_price>1">
                    <img src="http://p2.icaixiaochu.com/vip-icon.png" alt>
                  </div>
                </div>
              </div>
              <div class="menu-right extend" @click.stop="create(item)">
                <img src="http://p2.icaixiaochu.com/card.png" alt>
              </div>
            </div>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    goods: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      categoryGoodData: []
    }
  },
  computed: {
    ...mapGetters(['cart'])
  },
  methods: {
    goodDetail (item) {
      wx.navigateTo({
        url: `../goods/main?id=${item.goods_id}`
      })
    },
    uploadFormId (e) {
      console.log(e)
      if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
        let formId = e.target.formId

        this.$http
          .post('/collectForm', {
            formid: formId
          })
          .then(res => {
            if (res.status) {
              console.log('收集用户formid成功' + new Date().getTime())
            }
          })
      }
    },
    scroll (e) {
      this.scrollTop = e.mp.detail.scrollTop
    },
    create (item) {
      this.create_db(item)
    },
    ...mapActions(['create_db'])
  },
  mounted () {
    // console.log(this.goods)
    // this.categoryGoodData = this.goods.map((ele) => {
    //   this.cart.forEach(element => {
    //     if (ele.goods_id === element.good_id) {
    //       ele.cartNum = element.count
    //     }
    //   })
    //   return ele
    // })
  },
  watch: {
    goods: {
      handler (newVal, oldVal) {
        this.categoryGoodData = newVal.map((ele) => {
          this.cart.forEach(element => {
            if (ele.goods_id === element.good_id) {
              ele.cartNum = element.count
            }
          })
          return ele
        })
      },
      immediate: true
    }
  }
}
</script>
<style lang="less" scoped>
.sku-container {
  height: 100%;
  overflow: hidden;
  .skulist-wrp {
    overflow: hidden;
    height: 100%;
    .good-list {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      .sku-item {
        height: 110px;
        display: flex;
        justify-content: space-between;
        flex-flow: row nowrap;
        overflow: hidden;
        padding: 8px 0;
        button {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1;
          opacity: 0;
        }
        button::after {
          border: none;
        }
        // margin-bottom: 16px;
        .icon {
          flex: 0 0 105px;
          height: 105px;
          img {
            max-width: 105px;
            max-height: 105px;
          }
        }
        .good-detal {
          flex: 1;
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;
          padding: 0 12px;
          width: 1px;
          height: 100%;
          padding-bottom: 7px;
          border-bottom: 1px solid rgba(243, 243, 243, 1);
          box-sizing: border-box;
          .good-top {
            display: flex;
            flex-flow: column nowrap;
            .good-info {
              display: flex;
              align-items: center;
              .tag-icon {
                width: 28px;
                height: 14px;
                padding-right: 4px;
              }
              .footer-text {
                height: 21px;
                font-size: 15px;
                font-weight: bold;
                line-height: 21px;
                color: rgba(0, 0, 0, 0.87);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .good-name {
                font-size: 15px;
                font-weight: bold;
                line-height: 21px;
                color: rgba(0, 0, 0, 0.87);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .couple {
                border-radius: 5px;
                font-size: 10px;
                padding: 0 4px;
                line-height: 16px;
                text-align: center;
                margin-right: 4px;
              }
            }
            .good-title {
              font-size: 11px;
              font-weight: bold;
              line-height: 16px;
              color: rgba(0, 0, 0, 0.45);
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .footer-menu {
            display: flex;
            justify-content: space-between;
            flex-flow: row nowrap;
            align-items: flex-end;

            .menu-left {
              flex: 1;
              .price {
                display: flex;
                height: 24px;
                font-size: 17px;
                font-family: PingFang SC;
                font-weight: bold;
                color: rgba(245, 45, 60, 1);
                flex-flow: row nowrap;
                align-items: center;
                display: table-cell;
                vertical-align: bottom;
                .money {
                  font-size: 14px;
                }
              }
              .dash-price-info {
                display: flex;
                justify-content: start;
                flex-flow: row nowrap;
                align-items: center;
                .dash-price {
                  font-size: 14px;
                  font-family: PingFang SC;
                  font-weight: 400;
                  color: rgba(29, 29, 29, 1);
                  text-align: left;
                  margin-right: 4px;
                }
                .small {
                  text-decoration: line-through;
                  color: rgba(29, 29, 29, 0.5);
                }
                .vip-price {
                  width: 30px;
                  height: 11px;
                  display: flex;
                  align-items: center;
                  img {
                    width: 28px;
                    height: 11px;
                  }
                }
              }
            }
            .extend::after {
              content: "";
              position: absolute;
              top: -10px;
              left: -10px;
              right: -10px;
              bottom: -10px;
            }

            .menu-right {
              position: relative;
              width: 26px;
              height: 26px;
              background: rgba(254, 168, 53, 1);
              box-shadow: 0px 2px 6px rgba(254, 168, 53, 0.75);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 2;

              img {
                width: 17px;
                height: 15px;
                position: relative;
                left: -0.7px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
