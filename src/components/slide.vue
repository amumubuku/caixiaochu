<template>
  <div class="slide">
    <scroll-view width="100%" class="scroll" scroll-x="true">
      <div class="shop-list">
        <div
          class="list"
          v-for="(item,index) in skulist"
          :key="index"
          @click.stop="navtodetail(item)"
        >
          <div class="tag-icon" v-if="index === 0">爆款</div>
          <!-- <form-button></form-button> -->
          <div class="item-top">
            <img :src="item.cover" mode="scaleToFill" alt>
          </div>
          <div class="footer-info">
            <div class="footer-title">
              <text
                v-if="item.label"
                class="couple"
                style="background: #E2F3FF; color: #26A6FF"
              >{{item.label}}</text>
              <h5 class="footer-text">{{item.title}}</h5>
            </div>
            <div class="footer-menu">
              <div class="menu-left">
                <div class="price">
                  <span class="icon">¥</span>
                  <span>{{item.sku.market_price}}</span>
                </div>
                <div class="dash-price-info">
                  <div
                    :class="item.sku.vip_price>1? 'dash-price' : 'dash-price small'"
                  >¥{{item.sku.vip_price>1 ? item.sku.vip_price : item.sku.normal_price}}</div>
                  <div class="vip-price" v-if="item.sku.vip_price>1">
                    <img src="http://p2.icaixiaochu.com/vip-icon.png" alt>
                  </div>
                </div>
              </div>
              <div class="menu-right" @click.stop="addCard(item)">
                <img src="http://p2.icaixiaochu.com/card.png" alt>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
// import formButton from './form-button'
export default {
  props: {
    skulist: {
      type: Array,
      default: []
    }
  },
  methods: {
    addCard (item) {
      this.create_db(item)
    },
    navtodetail (item) {
      wx.navigateTo({
        url: `../goods/main?id=${item.goods_id}`
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
.slide {
  width: 100%;
  .shop-list {
    display: flex;
    flex-flow: row nowrap;
    padding-left: 16px;
    padding: 12px 0 20px 16px;

    .list {
      position: relative;
      flex: 0 0 130px;
      height: 206px;
      box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      display: flex;
      flex-flow: column nowrap;
      background: rgba(255, 255, 255, 1);
      margin-right: 10px;
      overflow: hidden;
      position: relative;
      .tag-icon {
        position: absolute;
        width: 42px;
        height: 20px;
        background: rgba(255, 99, 4, 1);
        text-align: center;
        box-shadow: 0px 2px 6px rgba(255, 99, 4, 0.33);
        border-radius: 0px 0px 5px 0px;
        font-size: 13px;
        font-weight: bold;
        line-height: 20px;
        color: rgba(255, 255, 255, 1);
      }
      .footer-info {
        padding: 6px 8px 12px 8px;
        height: 76px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-evenly;
        .footer-title {
          display: flex;
          align-items: center;
          .footer-text {
            flex: 1;
            height: 18px;
            font-size: 13px;
            font-weight: bold;
            line-height: 18px;
            color: rgba(0, 0, 0, 0.87);
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }

          .couple {
            border-radius: 5px;
            font-size: 10px;
            padding: 0 4px;
            line-height: 16px;
            text-align: center;
            margin-right: 4px;
            white-space: nowrap;
          }
        }
      }

      .footer-menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .menu-left {
          flex: 1;
          .price {
            font-size: 17px;
            font-weight: bold;
            color: rgba(245, 45, 60, 1);
            opacity: 1;
            display: flex;
            align-items: baseline;
            .icon {
              font-size: 13px;
              padding-right: 1px;
            }
          }
          .dash-price-info {
            display: flex;
            justify-content: start;
            flex-flow: row nowrap;
            align-items: center;
            .dash-price {
              font-size: 14px;

              font-weight: 400;
              color: rgba(32, 32, 32, 1);

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
        .menu-right {
          flex: 0 0 28px;
          width: 28px;
          height: 28px;
          background: rgba(254, 168, 53, 1);
          box-shadow: 0px 2px 6px rgba(254, 168, 53, 0.75);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          img {
            width: 21px;
            height: 18px;
          }
        }
      }

      .item-top {
        width: 130px;
        height: 130px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
