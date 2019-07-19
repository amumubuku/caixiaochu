<template>
  <div class="slide">
    <scroll-view width="100%" class="scroll" scroll-x="true">
      <div class="shop-list">
        <div
          class="list"
          v-for="(item,index) in skulist"
          :key="index"
          @click.stop="navtodetail(item)"
          :class="{'text-danger': index === skulist.length-1}"
        >
          <div class="item-top">
            <img :src="item.cover" mode="aspectFill"  alt />
          </div>
          <div class="footer-info">
            <div class="footer-title">
              <img class="tag-icon" :src="item.label_id" alt v-if="item.label_id" />
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
                    <img src="http://p2.icaixiaochu.com/vip-icon.png" alt />
                  </div>
                </div>
              </div>
              <div class="menu-right" @click.stop="addCard(item)">
                <img src="http://p2.icaixiaochu.com/card.png" alt />
              </div>
            </div>
          </div>
        </div>
        <div class="more-goods" @click.stop="jumpCategory()">
          <div class="content">
            <p>查看更多</p>
            <img src="https://img.icaixiaochu.com/76BRQDjYW5N60AnQ" alt />
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
    },
    id: {
      type: Number,
      default: 0
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
    padding: 12px 0px 20px 16px;
    align-items: center;
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
        width: 28px;
        height: 14px;
        padding-right: 4px;
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
        background: rgba(52, 52, 52, 0.8);
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
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
}
</style>
