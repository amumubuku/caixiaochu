<template>
  <div class="floor" v-if="categoryAreaList.length>=1">
    <activity-top :info="{'title': '商品分类','des': '你想要的这里都有'}" page="../category/main" color="#000">
      <div class="icon-bg">
        <img src="https://img.icaixiaochu.com/category-icon.png" alt />
      </div>
    </activity-top>
    <div class="floor-wrp">
      <div class="floor-list" v-for="(item, index) in categoryAreaList" :key="index">
        <div class="floor-banner" @click="jumpCategory(item.category_id)">
          <img :src="item.image" lazy-load="true" alt />
        </div>
        <slide :goods="item.goods" :id="item.category_id" @jump="jumpCategory" showMore="true" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import slide from '@/components/slide'
import ActivityTop from "@/components/activity-top";
export default {
  data () {
    return {
      categoryAreaList: []
    }
  },
  components: {
    slide,
    ActivityTop
  },
  methods: {
    getCategory () {
      this.$http.get('/getIndexGoods').then(res => {
        this.categoryAreaList = Object.freeze(res.data)
      })
    },
    addCard (item) {
      this.create_db(item)
    },
    navtodetail (item) {
      var goodsId = item.good_id
      wx.navigateTo({
        url: `../goods/main?id=${goodsId}`
      })
    },
    jumpCategory (id) {
      wx.navigateTo({
        url: `../categorydata/main?id=${id}`
      })
    },
    ...mapActions(['create_db'])
  },
  mounted () {
    this.getCategory()
  }
}
</script>
<style lang="less" scoped>
.floor {
  .icon-bg {
    width: 18px;
    height: 18px;
    background: linear-gradient(
      180deg,
      rgba(248, 122, 104, 1) 0%,
      rgba(241, 165, 89, 1) 100%
    );
    box-shadow: 0px 3px 6px rgba(248, 122, 104, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 10px;
      height: 9px;
    }
  }
  .floor-wrp {
    .floor-list {
      border-radius: 10px;
      margin-bottom: 14px;
      background: #fff;
      .floor-banner {
        height: 133px;
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
