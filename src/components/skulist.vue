<template>
  <div class="sku-container">
    <div class="skulist-wrp">
      <scroll-view class="good-list" scroll-y="true" @scroll="scroll" style="height:100%;">
        <div v-for="(item, index) in goods" :key="index" @click="goodDetail(item)" class="sku-item">
          <div class="icon">
            <img :src="item.cover" mode="aspectFill" alt>
          </div>
          <div class="good-detal">
            <div class="good-top">
              <div class="good-info">
                <text class="couple" style="background: #E2F3FF; color: #26A6FF">{{item.label}}</text>
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
import { mapActions } from 'vuex'
export default {
  props: {
    goods: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      scrollTop: ''
    }
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
    toSearchPage () {
      // 跳转到搜索页面
    },
    scroll (e) {
      // this.scrollTop = e.mp.detail.scrollTop
    },
    create (item) {
      this.create_db(item)
    },
    ...mapActions(['create_db'])
  },
  mounted () {
    this.$watch('goods', () => {
      // this.scrollTop = 0
    })
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
          flex: 0 0 110px;
          height: 110px;
          img {
            max-width: 110px;
            max-height: 110px;
          }
        }
        .good-detal {
          flex: 1;
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;
          margin: 0 12px;
          height: 100%;
          padding-bottom: 7px;
          border-bottom: 1px solid rgba(243, 243, 243, 1);
          .good-top {
            display: flex;
            flex-flow: column nowrap;
            .good-info {
              display: flex;
              align-items: center;
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
