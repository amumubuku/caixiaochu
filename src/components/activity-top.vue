<template>
  <div class="module-wrp" :style="{background: 'url('+bgCover+')'}">
    <div class="left-content" :style="{color:color}">
      <div class="icon">
        <slot></slot>
      </div>
      <div class="title">{{info.title}}</div>
      <p>{{info.des}}</p>
    </div>
    <div class="more-btn" v-if="color === '#000'" @click="toPage">
      <p>全部</p>
    </div>
    <div class="more-btn1" v-else @click="toPage">
      <p>全部</p>
      <img src="https://img.icaixiaochu.com/more-icon-v2.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: []
    };
  },
  props: {
    info: {
      type: Object,
      default: {
        title: "菜小厨",
        des: "乐享生活"
      }
    },
    showBorder: {
      type: Boolean,
      default: false
    },
    page: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#fff"
    },
    bgCover: String
  },
  methods: {
    toPage() {
      let page = this.page;
      wx.navigateTo({
        url: page,
        success: result => {},
        fail: () => {
          wx.switchTab({
            url: page,
            success: result => {},
            fail: () => {},
            complete: () => {}
          });
        },
        complete: () => {}
      });
    },
    emitMore() {
      this.$emit("emitMore");
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.module-wrp {
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 10px;
  overflow: hidden;
  background-size: 100% 100%;
   background-repeat: no-repeat;
  .left-content {
    display: flex;
    align-items: center;
    color: #fff;
    .title {
      font-size: 19px;
      font-weight: 800;
      margin: 0 6px;
    }
    p {
      font-size: 11px;
      font-weight: 400;
    }
  }
  .more-btn {
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
  .more-btn1 {
    width: 60px;
    height: 19px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 10px rgba(0, 144, 185, 0.4);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      font-size: 10px;
      font-weight: 400;
      line-height: 14px;
      color: rgba(0, 186, 240, 1);
      padding-left: 3px;
    }
    img {
      width: 7px;
      height: 7px;
    }
  }
}
</style>
