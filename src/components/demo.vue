<template>
  <div class="floor">
    <div class="floor-wrp">
      <div class="floor-list" v-for="(item, index) in skuitem" :key="index">
        <div class="floor-banner" @click="jumpCategory(item.id)">
          <img src="http://p0.meituan.net/mallimages/4860818fab92b92e997340b75cb78c9366372.png" alt>
        </div>
        <div class="hot-goods" @click="navtodetail(item)">
          <div class="hot-goods-left">
            <img :src="item.itemList[0].cover" alt>
            <div class="hot-icon">爆款</div>
          </div>
          <div class="hot-goods-right">
            <div class="footer-title">
              <h5 class="good-title">澳洲无籽青提500g</h5>
              <p class="good-name">进口青提，美容养颜</p>
              <i class="couple">新人专享</i>
            </div>
            <div class="footer-menu">
              <div class="menu-left">
                <div class="price">
                  <span class="icon">¥</span>
                  <span>{{item.itemList[0].price}}</span>
                </div>
                <div class="dash-price-info">
                  <div
                    class="dash-price"
                  >¥{{item.itemList[0].vipPrice ? item.itemList[0].vipPrice : item.itemList[0].sellerPrice}}</div>
                  <div class="vip-price" v-if="item.itemList[0].vipPrice">
                    <img src="http://pqii2vvge.bkt.clouddn.com/vip-icon.png" alt>
                  </div>
                </div>
              </div>
              <div class="menu-right" @click.stop="addCard(item.itemList[0])">
                <img src="http://pqii2vvge.bkt.clouddn.com/card.png" alt>
              </div>
            </div>
          </div>
        </div>
        <scroll-view
          width="100%"
          class="scroll"
          scroll-x="true"
        >
          <div class="sku-content">
            <div
              class="list"
              v-for="(item,id) in item.itemList"
              :key="id"
              @click.stop="navtodetail(item)"
            >
              <div class="item-top">
                <img :src="item.cover" alt>
              </div>
              <div class="footer-info">
                <div class="footer-title">
                  <p class="couple">新人</p>
                  <h5 class="footer-text">澳洲无籽青提500g</h5>
                </div>
                <div class="footer-menu">
                  <div class="menu-left">
                    <div class="price">
                      <span class="icon">¥</span>
                      <span>{{item.sellerPrice}}</span>
                    </div>
                    <div class="dash-price-info">
                      <div
                        :class="item.vipPrice ? 'dash-price' : 'dash-price small'"
                      >¥{{item.vipPrice ? item.vipPrice : item.price}}</div>
                      <div class="vip-price" v-if="item.vipPrice">
                        <img src="http://pqii2vvge.bkt.clouddn.com/vip-icon.png" alt>
                      </div>
                    </div>
                  </div>
                  <div class="menu-right" @click.stop="addCard(item)">
                    <img src="http://pqii2vvge.bkt.clouddn.com/card.png" alt>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </scroll-view>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    skuitem: {
      type: Array,
      default: []
    }
  },
  methods: {
    addCard (item) {
      console.log(item)
      this.create_db(item)
    },
    navtodetail (item) {
      var goodsId = item.good_id
      wx.navigateTo({
        url: `../goods/main?id=${goodsId}`
      })
    },
    jumpCategory (item) {
      var categoryId = item.id
      wx.navigateTo({
        url: `../skulist/main?id=${categoryId}`
      })
    },
    ...mapActions(['create_db'])
  }
}
</script>
<style lang="less" scoped>
.floor {
  width: 100%;
  .floor-wrp {
    .floor-list {
      height: 454px;
      width: 100%;
      border-bottom: 10px solid rgba(242, 242, 242, 1);
      .floor-banner {
        height: 100px;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .hot-goods {
        height: 130px;
        margin: 0 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-flow: row nowrap;
        box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        margin-bottom: 8px;
        border-radius: 4px;
        margin-top: 4px;
        .hot-goods-left {
          width: 130px;
          height: 130px;
          flex: 0 0 130px;
          position: relative;
          .hot-icon {
            width: 42px;
            height: 20px;
            background: rgba(255, 99, 4, 1);
            box-shadow: 0px 2px 6px rgba(255, 99, 4, 0.33);
            border-radius: 5px 0px 5px 0px;
            line-height: 20px;
            color: #fff;
            position: absolute;
            left: 0px;
            bottom: 0;
            font-size: 13px;
            text-align: center;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
        .hot-goods-right {
          flex: 1;
          height: 100%;
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-around;
          padding: 0 16px;
          .footer-menu {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .menu-left {
              flex: 1;
              .price {
                height: 24px;
                font-size: 17px;
                font-family: PingFang SC;
                font-weight: bold;
                color: rgba(245, 45, 60, 1);
                opacity: 1;
                display: flex;
                display: flex;
                align-items: center;
                .icon {
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
            .menu-right {
              flex: 0 0 31px;
              width: 31px;
              height: 31px;
              background: rgba(254, 168, 53, 1);
              box-shadow: 0px 2px 6px rgba(254, 168, 53, 0.75);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                width: 21px;
                height: 18px;
              }
            }
          }
          .footer-title {
            .good-title {
              height: 21px;
              font-size: 15px;
              font-family: PingFang SC;
              font-weight: bold;
              line-height: 21px;
              color: rgba(0, 0, 0, 0.87);
            }
            .good-name {
              height: 14px;
              font-size: 10px;
              font-family: PingFang SC;
              font-weight: bold;
              line-height: 14px;
              color: rgba(0, 0, 0, 0.45);
            }
            .couple {
              font-size: 20rpx;
              border-radius: 24rpx;
              color: #fff;
              width: 80rpx;
              background: #26a6ff;
              padding: 0 16rpx;
              line-height: 32rpx;
              text-align: center;
              margin-top: 12rpx;
            }
          }
          img {
            width: 20px;
            height: 18px;
          }
        }
      }
      .sku-content {
        display: flex;
        flex-flow: row nowrap;
        margin-left: 16px;
        .list {
          flex: 0 0 130px;
          margin-right: 10px;
          height: 206px;
          margin-bottom: 16px;
          box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          margin-top: 2px;
          .footer-info {
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-around;
            margin: 0 8px;
            height: 76px;
            .footer-title {
              display: flex;
              align-items: center;
              .footer-text {
                font-size: 13px;
                font-family: PingFang SC;
                font-weight: bold;
                color: rgba(0, 0, 0, 0.87);
                font-weight: bold;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .couple {
                width: 28px;
                background: rgba(226, 243, 255, 1);
                border-radius: 5px;
                font-size: 10px;
                color: rgba(38, 166, 255, 1);
                width: 20px;
                padding: 0 8px;
                line-height: 16px;
                text-align: center;
              }
            }
          }
          .footer-menu {
            display: flex;
            justify-content: space-between;
            flex-flow: row nowrap;
            align-items: center;
            .menu-left {
              flex: 1;
              .price {
                height: 24px;
                font-size: 17px;
                font-family: PingFang SC;
                font-weight: bold;
                color: rgba(245, 45, 60, 1);
                opacity: 1;
                display: flex;
                display: flex;
                align-items: center;
                .icon {
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
            .menu-right {
              height: 31px;
              width: 31px;
              border-radius: 50%;
              align-items: center;
              display: flex;
              justify-content: center;
              background: rgba(254, 168, 53, 1);
              box-shadow: 0px 2px 6px rgba(254, 168, 53, 0.75);
              img {
                width: 21px;
                height: 18px;
              }
            }
          }
          .item-top {
            height: 130px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
