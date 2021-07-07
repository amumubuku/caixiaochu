<template>
  <div class="top-tag">
    <div class="top-flex-left">
      <div class="icon">
        <slot></slot>
      </div>
      <div class="title">{{info.title}}</div>
      <p>{{info.des}}</p>
    </div>
    <div class="top-flex-right" v-if="page" @click="toPage">
      <p>全部</p>
    </div>
    <div class="border" v-if="showBorder"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: []
    }
  },
  props: {
    info: {
      type: Object,
      default: {
        title: '菜小厨',
        des: '乐享生活'
      }
    },
    showBorder: {
      type: Boolean,
      default: false
    },
    page: {
      type: String,
      default: ''
    }
  },
  methods: {
    toPage () {
      let page = this.page
      wx.navigateTo({
        url: page,
        success: result => {},
        fail: () => {
          wx.switchTab({
            url: page,
            success: (result) => {

            },
            fail: () => {},
            complete: () => {}
          })
        },
        complete: () => {}
      })
    },
    emitMore () {
      this.$emit('emitMore')
    }
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
.top-tag {
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 10px;
  overflow: hidden;
  .border {
    width: 100%;
    height: 1px;
    position: absolute;
    left: 42px;
    bottom: 0;
    background: rgba(243, 243, 243, 1);
  }
  .top-flex-left {
    display: flex;
    align-items: center;
    .title {
      font-size: 19px;
      font-weight: 800;
      color: rgba(0, 0, 0, 0.87);
      margin: 0 6px;
    }
    p {
      font-size: 11px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.5);
    }
  }
  .top-flex-right {
    width: 50px;
    height: 24px;
    border: 3px solid rgba(112, 112, 112, 0.1);
    border-radius: 30px;
    font-size: 11px;
    font-weight: 500;
    line-height: 24px;
    text-align: center;
    color: rgba(0, 0, 0, 1);
  }
}
</style>
