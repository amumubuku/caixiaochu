<template>
  <div class="app">
    <div class="header">
      <div class="header-wrp">
        <div class="location-box" @click="toAddresPage">
          <p>{{cityName}}</p>
          <img src="http://p2.icaixiaochu.com/down.png" alt />
        </div>
        <form class="form" @click="toSearchPage">
          <div class="btn">
            <img src="http://p2.icaixiaochu.com/search.png" alt />
            <span>搜索商品</span>
          </div>
        </form>
      </div>
    </div>
    <div class="app-wrp">
      <banner :banner="banner" />
      <div class="category">
        <div class="category-wrp">
          <div
            class="category-item"
            v-for="(item,index) in navlist"
            :key="index"
            @click="jumpCatogory(item)"
          >
            <img :src="item.icon" alt />
            <p>{{item.title}}</p>
          </div>
        </div>
      </div>
      <div class="gift-activity" @click="activityGift">
        <img src="https://img.icaixiaochu.com/gift-activitypng" mode="scaleToFill" alt />
      </div>

      <div class="content-box">
        <div class="spike" v-if="spikeGood.length">
          <div class="head-top" @click="toActivity">
            <div class="flex-left">
              <img src="https://img.icaixiaochu.com/spike-icon.png" alt />
              <h3>限时抢</h3>
            </div>
            <div class="flex-right">
              <p>{{spike.hour}}点场 距离下场还有</p>
              <div class="time-row">
                <div class="time-col">{{countDownTime.hou}}</div>:
                <div class="time-col">{{countDownTime.min}}</div>:
                <div class="time-col">{{countDownTime.sec}}</div>
              </div>
            </div>
          </div>

          <div class="main">
            <slide :goods="spike.data"></slide>
          </div>
        </div>
        <div class="dynamic">
          <div class="border"></div>
          <div class="dynamic-icon">
            <img src="https://img.icaixiaochu.com/dy-icon.png" alt />
          </div>
          <div class="dynamic-content">
            <swiper
              class="swiper_container"
              vertical="true"
              autoplay="true"
              circular="true"
              interval="2500"
            >
              <swiper-item v-for="(item, index) in dynamic" :key="index" class="item">
                <div class="tag">{{item.status ? '新会员': '新订单'}}</div>
                <p>{{item.str}}</p>
              </swiper-item>
            </swiper>
          </div>
        </div>
        <div class="couple">
          <div class="couple-wrp">
            <activity-top
              :info="{'title': '新人专享','des': '很高兴认识你^_^'}"
              showBorder="true"
              page="../discount/main"
              bgCover="https://img.icaixiaochu.com/couple-cover.png"
            >
             <div class="icon-bg">
                <img src="https://img.icaixiaochu.com/couple-icon.png" alt />
              </div>
            </activity-top>
            <div class="shop">
              <slide :goods="coupleGood"></slide>
            </div>
          </div>
        </div>
        <div class="member">
          <div class="top">
            <activity-top
              :info="{'title': '会员专区','des': '专属于你的优惠'}"
              showBorder="true"
              page="../member/main"
              bgCover="https://img.icaixiaochu.com/member-cover.png"
            >
              <div class="icon-bg">
                <img src="https://img.icaixiaochu.com/membar-icon.png" alt />
              </div>
            </activity-top>
          </div>

          <div class="shop">
            <slide :goods="memberGood"></slide>
          </div>
        </div>
        <floor />
        <div class="hot-container">
          <recommend :goods="recommendGoods" showTitle="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import banner from "@/components/bannerslide";
import ActivityTop from "@/components/activity-top";
import floor from "@/components/floor";
import slide from "@/components/slide";
import { setTabBarBadge, removeTabBarBadge } from "@/utils";
import { reverseGeocoder } from "@/utils/address";
import recommend from "@/components/recommend";
import popup from "@/components/popup";
import { mapGetters, mapMutations, mapActions } from "vuex";
import QQMapWX from "wx-qqmap-jssdk";
const qqMapSdk = new QQMapWX({
  key: "5GXBZ-7PPWJ-UM6F2-K7AUH-KPQNQ-CFBE5"
});
export default {
  data() {
    return {
      coupleGood: [],
      location: "",
      navlist: [],
      banner: [],
      recommendGoods: [],
      limit: [],
      countDownTime: "",
      page: 1,
      loading: false,
      Activity: [],
      couponModalData: [],
      dynamic: [],
      memberGood: [],
      spike: [],
      spikeGood: [],
      coupon: ""
    };
  },
  computed: {
    ...mapGetters(["data", "cityName", "city", "cart", "cartInfos"])
  },
  components: {
    banner,
    floor,
    recommend,
    popup,
    slide,
    ActivityTop
  },

  onShow() {
    if (this.cartInfos.num >= 1) {
      setTabBarBadge(`${this.cartInfos.num}`);
    } else {
      removeTabBarBadge();
    }
  },
  mounted() {
    Promise.all([
      this.getHotGoods(),
      this.getCurLocation(),
      this.getDynamic(),
      this.getSpike(),
      this.countDown(),
      this.getprodectlist(),
      this.getMember()
    ]).then(res => {});
  },
  methods: {
    activityGift() {
      wx.navigateTo({
        url: "../coupon/main",
        success: result => {},
        fail: () => {},
        complete: () => {}
      });
    },
    getSpike() {
      this.$http.post("/fetchPurchasingGoods").then(res => {
        if (!res.data) return;
        this.spike = res.data;
        this.spikeGood = res.data.data;
        this.countDown();
      });
    },
    getMember() {
      this.$http.get("/getVipGoods", { type: "limit" }).then(res => {
        this.memberGood = res.data;
      });
    },
    getDynamic() {
      this.$http.post("/getDynamic").then(res => {
        this.dynamic = res.data;
      });
    },
    getHotGoods(page = 1) {
      this.$http.get("/fetchHotGoods", { page }).then(res => {
        if (res.data.length < 1 && this.page >= 1) {
          wx.showToast({
            title: "没有商品了",
            icon: "none",
            duration: 2000
          });
          return;
        }
        this.loading = true;
        this.recommendGoods = Object.freeze(
          this.recommendGoods.concat(res.data)
        );
      });
    },
    Result(data) {
      let ret = [];
      ret.push(...data);
      return ret;
    },
    timeFormat(param) {
      return param < 10 ? "0" + param : param;
    },
    countDown() {
      let newTime = new Date().getTime();
      let countDownTime = this.spike.time;
      let endTime = new Date(countDownTime).getTime();
      let obj = null;
      if (endTime - newTime > 0) {
        let time = (endTime - newTime) / 1000;
        let day = parseInt(time / (60 * 60 * 24));
        let hou = parseInt((time % (60 * 60 * 24)) / 3600);
        let min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60);
        let sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60);
        obj = {
          day: this.timeFormat(day),
          hou: this.timeFormat(hou),
          min: this.timeFormat(min),
          sec: this.timeFormat(sec)
        };
      } else {
        return false;
      }

      this.countDownTime = obj;
      setTimeout(this.countDown, 1000);
    },
    addCard(item) {
      this.create_db(item);
    },
    ...mapActions(["create_db"]),
    toAddresPage() {
      wx.navigateTo({
        url: `../setlocation/main`
      });
    },
    ...mapMutations({
      setCityname: "SET_CITYNAME",
      setCity: "SET_CITY"
    }),
    toCoupon() {
      wx.navigateTo({
        url: `../coupon/main`
      });
    },
    toDiscount() {
      wx.navigateTo({
        url: `../discount/main`
      });
    },
    toActivity() {
      wx.navigateTo({
        url: `../activity/main`
      });
    },
    getprodectlist() {
      this.$http.get("/getIndexHeadNew").then(res => {
        this.banner = res.data.slide_show;
        this.navlist = res.data.navlist;
        this.$http.get("/getRecommendGoods").then(res => {
          this.coupleGood = res.data;
        });
      });
      wx.stopPullDownRefresh();
    },
    jumpCatogory(item) {
      if (!item.id) {
        this.toActivity();
        return;
      }
      wx.navigateTo({
        url: `../categorydata/main?id=${item.id}`
      });
    },
    navtodetail(item) {
      wx.navigateTo({
        url: `../goods/main?id=${item.goods_id}`
      });
    },
    toSearchPage() {
      wx.navigateTo({
        url: `../search/main`
      });
    },
    tonewarea() {
      wx.navigateTo({
        url: `../newarea/main`
      });
    },
    ...mapActions(["setUser", "InfoCart"]),
    getCurLocation() {
      reverseGeocoder(qqMapSdk).then(res => {
        this.setCityname(res.result.pois[0].title);
        this.cityList = res.result.pois;
        this.city = res.result.address_component.city;
      });
    }
  },
  onPullDownRefresh() {
    this.page = 1;
    this.recommendGoods = [];
    this.getHotGoods();
    this.getprodectlist();
    this.getActivityCoupon();
  },
  onReachBottom() {
    if (this.loading) {
      this.page++;
      this.loading = false;
      this.getHotGoods(this.page);
    }
  },
  onShareAppMessage: function(res) {
    if (res.from === "button") {
      // 来自页面内转发按钮
    }
    return {
      title: "菜小厨生鲜商城",
      path: "pages/index/main"
    };
  }
};
</script>
<style lang="less" scoped>
@import "./style";
</style>
