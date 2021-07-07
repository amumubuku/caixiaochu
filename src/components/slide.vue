<template>
  <div class="slide">
    <scroll-view width="100%" class="scroll" scroll-x="true">
      <div class="shop-list">
        <div
          class="shop-item"
          v-for="(item,index) in goods"
          :key="index"
          @click.stop="navtodetail(item)"
          :class="{'text-danger': index === goods.length-1}"
        >
          <div class="item-top">
            <img :src="item.cover" mode="aspectFill" alt />
          </div>
          <div class="footer-info">
            <div class="footer-title">
              <h5 class="footer-text">{{item.title}}</h5>
              <img class="tag-icon" :src="item.label_id" lazy-load alt v-if="item.label_id" />
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
                    <img src="https://img.icaixiaochu.com/vip-prive-v2.png" alt />
                  </div>
                </div>
              </div>
              <div class="menu-right" @click.stop="addCard(item)">
                <img src="https://img.icaixiaochu.com/addCard-icon.png" alt />
              </div>
            </div>
          </div>
        </div>
        <div class="more-goods" @click.stop="jumpCategory()" v-if="showMore">
          <div class="content">
            <p>查看更多</p>
            <img src="https://img.icaixiaochu.com/more-v2.png" alt />
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
    goods: {
      type: Array,
      default: []
    },
    id: {
      type: Number,
      default: 0
    },
    showMore: {
      type: Boolean,
      default: false
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
    jumpCategory () {
      this.$emit('jump', this.id)
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
    align-items: center;
    padding-left: 10px;
    box-sizing: border-box;
    .shop-item {
      position: relative;
      flex: 0 0 115px;
      height: 206px;
      display: flex;
      flex-flow: column nowrap;
      overflow: hidden;
      position: relative;
      margin-right: 10px;
      .tag-icon {
        width: 28px;
        height: 14px;
        padding-right: 4px;
      }
      .footer-info {
        padding: 10px;
        box-sizing: border-box;
        height: 100%;
        display: flex;
        padding-left: 0;
        flex-flow: column nowrap;
        justify-content: space-between;
        .footer-title {
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;
          .footer-text {
            flex: 1;
            font-size: 13px;
            font-weight: bold;
            color: rgba(0, 0, 0, 0.87);
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            margin-bottom: 3px;
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
            font-size: 16px;
            font-weight: bold;
            color: #FF6304;
            opacity: 1;
            display: flex;
            align-items: baseline;
            .icon {
              font-size: 12px;
              padding-right: 1px;
            }
          }
          .dash-price-info {
            display: flex;
            justify-content: start;
            flex-flow: row nowrap;
            align-items: center;
            .dash-price {
              font-size: 11px;
              font-weight: 400;
              color: #1D1D1D;
              text-align: left;
              margin-right: 4px;
            }
            .small {
              text-decoration: line-through;
              color:rgba(29,29,29,.5);
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
          flex: 0 0 23px;
          width: 23px;
          height: 23px;
          background: linear-gradient(
            180deg,
            rgba(250, 177, 68, 1) 0%,
            rgba(252, 142, 89, 1) 100%
          );
          box-shadow: 0px 2px 6px rgba(251, 131, 28, 0.5);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          img {
            width: 13px;
            height: 13px;
          }
        }
      }

      .item-top {
        width: 115px;
        height: 115px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .text-danger {
      margin: 0;
    }
    .more-goods {
      flex: 0 0 63px;
      display: flex;
      align-items: center;
      justify-content: center;
      .content {
        display: flex;
        flex: 0 0 43px;
        height: 164px;
        border-radius: 0px 5px 5px 0px;
        align-items: center;
        justify-content: center;
        flex-flow: column wrap;
        img {
          width: 17px;
          height: 17px;
        }
        p {
          width: 13px;
          height: 66px;
          font-size: 13px;
          font-weight: 400;
          line-height: 16px;
          color: rgba(0,0,0,.87);
        }
      }
    }
  }
}
</style>
