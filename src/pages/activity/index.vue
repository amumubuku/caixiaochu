<template>
  <div class="activity">
    <navigation-bar
      :title="'限时抢'"
      :navBackgroundColor="'#fff'"
      :titleColor="'#000'"
      :back-visible="true"
      :home-path="'/pages/index/main'"
    ></navigation-bar>
    <div class="time-list">
      <scroll-view
        width="100%"
        class="nav-scroll"
        scroll-x="true"
        :scroll-into-view="scrollId"
        scroll-with-animation="true"
      >
        <div class="nav-list">
          <div
            class="time-item"
            v-for="(item, index) in navlist"
            :key="index"
            :id="'scroll_'  + index"
            @click="goods(item,index)"
          >
            <p
              class="time"
              :style="{color:currentTab == index? '#FEA835':'',fontSize:currentTab == index? '23px':''}"
            >{{item.hour_str}}</p>
            <p
              class="state"
              :style="{color:currentTab == index? '#FEA835':''}"
            >{{item.status == 0 ?'已结束':item.status == 1 ?'已开始': '即将开抢'}}</p>
            <p class="active-icon" v-if="currentTab == index"></p>
          </div>
        </div>
      </scroll-view>
    </div>
    <div class="spike-head">
      <div class="spike-left">抢购中 先下单先得</div>
      <div class="spike-right">
        <p v-if="spikeStatus ===0">已结束</p>
        <p v-if="spikeStatus ===1">距离结束</p>
        <p v-if="spikeStatus ===2">距离开始</p>
        <div class="time-box" v-if="countDownArr.length>=1 && spikeStatus >=1 ">
          <div class="time-row">
            <div class="time-col">{{countDownArr[0].hou}}</div>:
            <div class="time-col">{{countDownArr[0].min}}</div>:
            <div class="time-col">{{countDownArr[0].sec}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="good-list">
      <scroll-view height="100%" class="scroll" scroll-y="true">
        <div
          class="good-item"
          v-for="(item,index) in goodList"
          :key="index"
          @click="GoodsDetail(item)"
        >
          <div class="good-cover">
            <div class="tag-box" v-if="index ===0 ">必抢精品</div>
            <img :src="item.cover" mode="aspectFill" alt />
          </div>
          <div class="good-info">
            <div class="good-title">{{item.title}}</div>
            <div class="good-name">{{item.description}}</div>
            <div class="progress-wrp">
              <div class="progress-bar">
                <div
                  class="inner"
                  :style="{width: item.sku.stock <1 ? 1 * 135 + 'px' : item.sku.sold / (item.sku.stock + item.sku.sold) * 135 + 'px'}"
                ></div>
              </div>
              <span>已售{{item.percent}}%</span>
            </div>

            <div class="good-buy">
              <div class="price-info">
                <p class="small">¥{{item.sku.normal_price}}</p>
                <p>¥{{item.sku.market_price}}</p>
              </div>
              <p
                v-if="spikeStatus === 0||spikeStatus === 2 "
                class="spike-end"
              >{{spikeStatus===0?'已结束':'即将开始'}}</p>
              <div class="buy" v-else :class="[ item.sku.stock < 1?'buy-tag': '']">
                <p>{{ item.sku.stock < 1 ? '已售罄':'马上抢'}}</p>
                <img
                  src="https://img.icaixiaochu.com/1n7tGgHQk7USEDBG.png"
                  v-if="item.sku.sold != item.sku.stock"
                  alt
                />
              </div>
            </div>
          </div>
        </div>
      </scroll-view>
    </div>
    <div class="null-good-list" v-if="!goodList.length >= 1">
      <img src="https://img.icaixiaochu.com/1@2x.png" alt />
      <p>暂无商品发布</p>
    </div>
  </div>
</template>

<script>
import navigationBar from '@/components/navigationBar.vue'
export default {
  data () {
    return {
      currentTab: 1,
      navlist: [],
      currentId: null,
      goodList: [],
      progressWidth: 44,
      spikeStatus: '',
      time: '',
      countDownArr: [],
      scrollId: ''
    }
  },
  components: {
    navigationBar
  },
  methods: {
    timeFormat (param) {
      return param < 10 ? '0' + param : param
    },
    countDown () {
      let newTime = new Date().getTime()
      let endTimeList = [this.time]
      let countDownArr = []
      endTimeList.forEach(o => {
        let endTime = new Date(o).getTime()
        let obj = null
        if (endTime - newTime > 0) {
          let time = (endTime - newTime) / 1000
          let day = parseInt(time / (60 * 60 * 24))
          let hou = parseInt((time % (60 * 60 * 24)) / 3600)
          let min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60)
          let sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60)
          obj = {
            day: this.timeFormat(day),
            hou: this.timeFormat(hou),
            min: this.timeFormat(min),
            sec: this.timeFormat(sec)
          }
        } else {
          // 活动已结束，全部设置为'00'
          obj = {
            day: '00',
            hou: '00',
            min: '00',
            sec: '00'
          }
        }
        countDownArr.push(obj)
      })
      this.countDownArr = countDownArr
      setTimeout(this.countDown, 1000)
    },
    navTime () {
      this.$http.post('/fetchHour').then(res => {
        res.data.forEach((element, index) => {
          if (element.status === 1) {
            this.currentTab = index
            this.goods(element, index)
          }
        })
        this.navlist = res.data
      })
    },
    GoodsDetail (item) {
      if (this.spikeStatus === 0) {
        wx.showToast({
          title: '活动已结束',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if (this.spikeStatus === 2) {
        wx.showToast({
          title: '活动还未开始',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if (item.sku.sold === item.sku.stock) {
        wx.showToast({
          title: '商品已售罄',
          icon: 'none',
          duration: 2000
        })
        return
      }
      wx.navigateTo({
        url: `../goods/main?id=${item.goods_id}`
      })
    },
    goods (item, index) {
      this.countDownArr = []
      this.goodList = []
      this.spikeStatus = item.status
      this.currentTab = index
      this.scrollId = index < 3 ? 'scroll_0' : 'scroll_' + (index - 2)
      this.currentId = item.id
      this.$http
        .post('/fetchPurchaseGoods', {
          time_id: item.id
        })
        .then(res => {
          let data = []
          if (res.data.data.length >= 1) {
            res.data.data.forEach(element => {
              var ele = element
              ele.percent = Math.floor(
                ele.sku.sold / (ele.sku.stock + ele.sku.sold) * 100
              )
              data.push(ele)
            })
          }
          this.goodList = data
          this.time = res.data.time
          this.countDown()
        })
    }
  },

  mounted () {
    this.navTime()
    this.countDown()
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '新品推荐',
      path: 'pages/activity/main'
    }
  }
}
</script>
<style lang="less" scoped>
@import "./style.less";
</style>

