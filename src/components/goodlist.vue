<template>
  <div class="recommend">
    <div class="list" v-for="(item,index) in goods" :key="index" @click="navtodetail(item)">
      <form-button></form-button>
      <div class="item-top">
        <img :src="item.cover"  mode="aspectFill" alt>
      </div>
      <div class="footer-info">
        <div class="footer-title">
              <!-- <text
                  class="couple"
                  style="background: #E2F3FF; color: #26A6FF"
                >{{item.label}}</text> -->
                <img class="tag-icon" :src="item.label_id"  alt="" v-if="item.label_id">
          <text class="footer-text">{{item.title}}</text>
        </div>
        <div class="footer-menu">
          <div class="menu-left">
            <div class="price">
              <span class="icon">¥</span>
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
          <div class="menu-right" @click.stop="create(item)">
            <img src="http://p2.icaixiaochu.com/card.png" alt>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import formButton from './form-button'
export default {
  props: {
    goods: {
      type: Array,
      default: []
    }
  },
  components: {
    formButton
  },
  methods: {
    create (item) {
      this.create_db(item)
    },
    navtodetail (item) {
      wx.navigateTo({
        url: `../goods/main?id=${item.goods_id}`
      })
    },
    ...mapActions(['create_db'])
  }
}
</script>
<style lang="less">
.recommend {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 0 8px;
  .list {
    position: relative;
    width: calc(50% - 16px);
    height: 248px;
    margin: 0 8px;
    margin-bottom: 16px;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 15px;
    background-color: #fff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
    .footer-info {
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      padding: 0 8px;
      height: 84px;
      .footer-title {
        display: flex;
        align-items: center;
        padding-bottom: 6px;
        .tag-icon {
          width: 28px;
          height: 14px;
          padding-right: 4px;
        }
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
          color: rgba(32,32,32,1);
            text-align: left;

            margin-right: 4px;
          }
          .small {
            text-decoration: line-through;
            color: rgba(29, 29, 29, .5);
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
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(254, 168, 53, 1);
        box-shadow: 0px 2px 6px rgba(254, 168, 53, 0.75);
        z-index: 2;
        img {
          width: 21px;
          height: 18px;
        }
      }
    }
    .item-top {
      img {
        width: 100%;
        height: 164px;
      }
    }
  }
}
</style>
