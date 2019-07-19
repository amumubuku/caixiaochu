<template>
  <div class="collapse shop-list">
    <div
      class="touchable"
      role="tab"
      :aria-expanded="active ? 'true' : 'false'"
      :class="active ? 'collapse-header' : 'is-active'"
    >

      <div class="good-item" v-for="(item, index) in goods" @click.stop="goodDetail(item)" :key="index" >
        <div class="order-detail">
          <div class="good-cover">
            <img :src="item.cover" alt>
          </div>
          <div class="good-des">
            <p>{{item.goods_title}}</p>
            <p class="num">数量X{{item.number}}</p>
          </div>
        </div>
        <div class="good-price">
          <p>¥{{item.real_price}}</p>
        </div>
      </div>
    </div>
    <div class="collapse-footer" @click.stop="toggle" v-if="goods.length>2"> 
      <p>{{active ? "展开更多" : "收起"}}</p>
      <img src="http://p2.icaixiaochu.com/more.png" alt :class="active ? '' : 'normal'">
    </div>
  </div>
</template>
<script>
export default {
  name: 'Collapse',
  data () {
    return {
      active: false,
      text: '展开更多',
      hide: true
    }
  },
  props: {
    selected: {
      type: Boolean,
      default: false
    },
    goods: {
      type: Array,
      default: []
    }
  },
  ready () {
    if (this.active) {
      this.$emit('collapse-open', this.index)
    }
  },
  methods: {
    goodDetail (item) {
      wx.navigateTo({
        url: `../goods/main?id=${item.goods_id}`
      })
    },
    toggle () {
      this.active = !this.active
      // if (this.active) {
      //   this.$emit('collapse-open', this.index)
      // }
    }
  }
}
</script>
<style lang="less" scoped>
.is-active {
  height: auto;
  transition: height 0.3s;
}
.touchable{
}
.collapse {
    .good-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;
      width: 100%;
      .order-detail {
        display: flex;
        flex: 1;
        padding-bottom: 4px;
        .good-cover {
          width: 50px;
          height: 50px;
          background: rgba(190, 190, 190, 0.66);
          margin-right: 12px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .good-des {
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;

          p {
            height: 20px;
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            color: rgba(0, 0, 0, 0.87);
          }
          .num {
            height: 16px;
            font-size: 11px;
            font-weight: 400;
            line-height: 16px;
            color: rgba(0, 0, 0, 0.5);
          }
        }
      }
      .good-price {
        flex: 0 0 56px;
        height: 21px;
        font-size: 15px;
        font-weight: bold;
        line-height: 21px;
        color: rgba(0, 0, 0, 0.87);
        text-align: end;
      }
    }
    .good-item:last-child{
      margin-bottom: 0; 
    }
  }
.collapse-header {
  height: 120px;
  overflow: hidden;
}
.collapse-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  background-color: #fff;
  padding:0 16px;
  box-sizing: content-box;
  position: relative;
  &:after {
    content: " ";
    position: absolute;
    top: 0px;
    display: block;
    height: 1px;
    width: 342px;
    background-color: #f0f0f0;
  }
  img {
    transition: all .5s;
    width: 15px;
    height: 15px;
    transform: rotate(90deg);
  }
  .normal {
    transform: rotate(270deg);
  }
  p {
    font-size: 13px;
    font-weight: 500;
    line-height: 18px;
    color: rgba(0, 0, 0, 0.6);
  }
}
</style>

